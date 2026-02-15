# Bloom - Reinforcement Learning System

*Technical documentation for the RL data collection and training system*

---

## Table of Contents

1. [Overview](#overview)
2. [Reinforcement Learning Primer](#reinforcement-learning-primer)
3. [System Architecture](#system-architecture)
4. [State Space](#state-space)
5. [Action Space](#action-space)
6. [Reward Function](#reward-function)
7. [Data Collection](#data-collection)
8. [Data Format](#data-format)
9. [Training Approaches](#training-approaches)
10. [API Reference](#api-reference)
11. [Examples](#examples)

---

## Overview

Bloom includes a built-in Reinforcement Learning (RL) data collection system designed to:

1. **Capture human gameplay** as training demonstrations
2. **Serialize game state** into neural network-compatible format
3. **Calculate rewards** based on estate management outcomes
4. **Export trajectories** for offline RL training

The system enables training AI agents to play Bloom through imitation learning or offline reinforcement learning.

---

## Reinforcement Learning Primer

### The RL Framework

Reinforcement Learning trains agents through trial and error:

```
┌─────────┐    action    ┌─────────────┐
│  Agent  │─────────────▶│ Environment │
│ (Policy)│              │   (Bloom)   │
└─────────┘◀─────────────└─────────────┘
           state, reward
```

**Key Concepts**:

| Term | Definition | Bloom Equivalent |
|------|------------|------------------|
| **State (s)** | Observation of environment | Game features (money, plants, time) |
| **Action (a)** | Decision made by agent | Move, hire, sell, interact |
| **Reward (r)** | Feedback signal | Money gained, plant health, penalties |
| **Policy (π)** | Mapping from states to actions | What action to take given game state |
| **Episode** | One complete playthrough | Start to bankruptcy/year-end |
| **Trajectory** | Sequence of (s, a, r, s') tuples | Recorded gameplay session |

### The Goal

Learn a policy π(s) → a that maximizes cumulative reward:

```
maximize E[Σ γᵗ rₜ]
```

Where γ (gamma) is a discount factor (typically 0.99) that values immediate rewards over future ones.

---

## System Architecture

```
┌────────────────────────────────────────────────────────────────┐
│                         Bloom Game                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │ Game State   │  │ Game Logic   │  │ Rendering            │  │
│  │ (plantation, │  │ (advanceTime,│  │ (canvas, UI)         │  │
│  │  resources)  │  │  events)     │  │                      │  │
│  └──────┬───────┘  └──────┬───────┘  └──────────────────────┘  │
│         │                 │                                     │
│         ▼                 ▼                                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    RL System                             │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  │   │
│  │  │ getState()  │  │ logAction() │  │ calculateReward │  │   │
│  │  │ State       │  │ Trajectory  │  │ Reward Shaping  │  │   │
│  │  │ Serializer  │  │ Logger      │  │                 │  │   │
│  │  └─────────────┘  └─────────────┘  └─────────────────┘  │   │
│  │                          │                               │   │
│  │                          ▼                               │   │
│  │  ┌─────────────────────────────────────────────────┐    │   │
│  │  │              Episode Storage                     │    │   │
│  │  │  [{episode: 1, trajectory: [...], reward: 127}] │    │   │
│  │  └─────────────────────────────────────────────────┘    │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              │                                  │
│                              ▼                                  │
│                    ┌──────────────────┐                        │
│                    │ JSON Export      │                        │
│                    │ downloadData()   │                        │
│                    └──────────────────┘                        │
└────────────────────────────────────────────────────────────────┘
```

---

## State Space

### Raw State Object

`rlSystem.getState()` returns a structured object with 35+ fields:

```javascript
{
  // === Time Features ===
  day: 15,                    // 1-31
  month: 11,                  // 1-12
  year: 2024,                 // Year
  season: "HARVEST",          // POST_HARVEST|BLOSSOM|PLANTING|MONSOON|RIPENING|HARVEST
  dayPhase: "MORNING",        // MORNING|AFTERNOON|EVENING
  seasonIndex: 5,             // 0-5 (numeric encoding)
  phaseIndex: 0,              // 0-2 (numeric encoding)

  // === Resources ===
  money: 45000,               // Current balance (₹)
  water: 2500,                // Liters in tank
  waterCapacity: 5000,        // Tank max capacity
  waterRatio: 0.5,            // water / capacity
  powerAvailable: 1,          // 1 = grid on, 0 = off
  generatorFuel: 50,          // Liters of fuel

  // === Workers ===
  workerCount: 5,             // Current workers
  maxWorkers: 10,             // Max allowed
  workerRatio: 0.5,           // count / max
  avgWorkerMorale: 75,        // 0-100
  avgWorkerEnergy: 60,        // 0-100

  // === Plants ===
  totalPlants: 72,            // Total coffee plants
  avgPlantHealth: 82,         // 0-100
  avgWaterLevel: 65,          // 0-100
  plantsWithPests: 3,         // Count with pest infection
  diseasedPlants: 1,          // Count in DISEASED stage

  // === Plant Stage Counts ===
  seedlings: 0,
  youngPlants: 10,
  maturePlants: 20,
  floweringPlants: 0,
  greenBerryPlants: 15,
  ripePlants: 25,             // Ready to harvest!

  // === Inventory ===
  cherriesArabica: 45.5,      // kg
  cherriesRobusta: 30.2,      // kg
  parchmentArabica: 20.0,     // kg
  parchmentRobusta: 15.0,     // kg
  greenBeansTotal: 50.0,      // kg (all grades combined)

  // === Supplies ===
  fertilizer: 15,             // Bags
  pesticide: 8,               // Cans
  seedlings: 0,               // Available to plant

  // === Player Position ===
  playerX: 0.35,              // Normalized 0-1
  playerY: 0.42,              // Normalized 0-1

  // === Meta ===
  gameState: 6                // Current game state enum
}
```

### Normalized State Vector

`rlSystem.getStateVector()` returns a 22-element float array suitable for neural network input:

```javascript
[
  // Index  Feature                    Normalization
  // -----  -------                    -------------
  0,        // day                     / 31
  1,        // month                   / 12
  2,        // seasonIndex             / 5
  3,        // phaseIndex              / 2
  4,        // money                   / 500000, capped at 1
  5,        // waterRatio              already 0-1
  6,        // powerAvailable          0 or 1
  7,        // generatorFuel           / 100
  8,        // workerRatio             already 0-1
  9,        // avgWorkerMorale         / 100
  10,       // avgWorkerEnergy         / 100
  11,       // avgPlantHealth          / 100
  12,       // avgWaterLevel           / 100
  13,       // plantsWithPests         / totalPlants
  14,       // diseasedPlants          / totalPlants
  15,       // ripePlants              / totalPlants
  16,       // floweringPlants         / totalPlants
  17,       // maturePlants            / totalPlants
  18,       // cherries (total)        / 100, capped at 1
  19,       // greenBeansTotal         / 100, capped at 1
  20,       // playerX                 already 0-1
  21        // playerY                 already 0-1
]
```

**Why normalize?**
- Neural networks train better with inputs in [0, 1] range
- Prevents features with large values from dominating
- Consistent scale across all features

---

## Action Space

### Discrete Actions

The system defines 17 discrete actions:

```javascript
ACTIONS: {
  // === Movement (4) ===
  MOVE_UP: 0,
  MOVE_DOWN: 1,
  MOVE_LEFT: 2,
  MOVE_RIGHT: 3,

  // === Core Interactions (4) ===
  INTERACT: 4,           // Context-sensitive (talk, use, pick)
  OPEN_DASHBOARD: 5,
  CLOSE_DASHBOARD: 6,
  ADVANCE_TIME: 7,       // End current phase

  // === Worker Management (3) ===
  HIRE_WORKER: 8,
  FIRE_WORKER: 9,
  ASSIGN_WORKER: 10,

  // === Market (2) ===
  SELL_COFFEE: 11,
  BUY_SUPPLIES: 12,

  // === Mini-game Actions (3) ===
  PICK_CHERRY: 13,       // Click in picking game
  SORT_BEAN: 14,         // Sort action in sorting game
  PROCESS_TAP: 15,       // Tap in processing game

  // === Meta (1) ===
  NO_OP: 16              // Do nothing (wait)
}
```

### Action Properties

| Category | Actions | Context |
|----------|---------|---------|
| Movement | 0-3 | Available when in plantation |
| Management | 4-12 | Available through menus/interactions |
| Mini-games | 13-15 | Only during respective mini-games |
| Meta | 16 | Always available |

### Action Masking (Future)

Not all actions are valid in all states. A proper RL implementation should mask invalid actions:

```javascript
function getValidActions(state) {
  const valid = new Set([ACTIONS.NO_OP]);

  if (state.gameState === STATES.PLANTATION_PLAY) {
    valid.add(ACTIONS.MOVE_UP, ACTIONS.MOVE_DOWN, ...);
    valid.add(ACTIONS.INTERACT);
    valid.add(ACTIONS.OPEN_DASHBOARD);
    valid.add(ACTIONS.ADVANCE_TIME);
  }

  if (state.gameState === STATES.MINIGAME_PICKING) {
    valid.add(ACTIONS.PICK_CHERRY);
  }

  return valid;
}
```

---

## Reward Function

### Reward Calculation

`calculateReward(prevState, currentState, action)` computes the reward for a transition:

```javascript
calculateReward(prevState, currentState, action) {
  let reward = 0;

  // === Primary: Economic Outcome ===
  const moneyDelta = currentState.money - prevState.money;
  reward += moneyDelta / 1000;  // ₹1000 = +1 reward

  // === Plant Health ===
  const healthDelta = currentState.avgPlantHealth - prevState.avgPlantHealth;
  reward += healthDelta * 0.1;  // +10 health = +1 reward

  // === Harvest Progress ===
  const harvestDelta = prevState.ripePlants - currentState.ripePlants;
  if (harvestDelta > 0) {
    reward += harvestDelta * 0.5;  // Harvesting ripe plants is good
  }

  // === Penalties ===
  const newPests = currentState.plantsWithPests - prevState.plantsWithPests;
  if (newPests > 0) {
    reward -= newPests * 2;  // New pest infections are bad
  }

  const plantDeaths = prevState.totalPlants - currentState.totalPlants;
  if (plantDeaths > 0) {
    reward -= plantDeaths * 5;  // Losing plants is very bad
  }

  // === Terminal States ===
  if (currentState.money <= 0) {
    reward -= 100;  // Bankruptcy
  }

  return reward;
}
```

### Reward Components

| Component | Formula | Rationale |
|-----------|---------|-----------|
| Money | Δmoney / 1000 | Primary objective is profit |
| Plant Health | Δhealth × 0.1 | Healthy plants yield more |
| Harvest | ripe_picked × 0.5 | Encourage harvesting |
| Pest Penalty | new_pests × -2 | Punish neglecting pests |
| Death Penalty | deaths × -5 | Severe punishment for plant loss |
| Bankruptcy | -100 | Terminal failure |

### Reward Shaping Considerations

The current reward function is **shaped** to guide learning. For pure RL:

```javascript
// Sparse reward (harder to learn, but theoretically cleaner)
sparseReward = (episode_end) ? final_money - initial_money : 0;

// Dense reward (current implementation, easier to learn)
denseReward = sum_of_per_step_rewards;
```

---

## Data Collection

### Starting Collection

```javascript
// Keyboard shortcut
Ctrl+R  // Toggle recording on/off

// Programmatic
rlSystem.toggle();        // Toggle
rlSystem.startEpisode();  // Explicit start
```

### During Collection

The system automatically:
1. Captures state before each action
2. Records the action taken
3. Captures state after action
4. Calculates reward
5. Stores the transition

### Ending Collection

Episodes end automatically on:
- **Bankruptcy**: money ≤ 0
- **Year completion**: Full year simulated
- **Manual toggle**: Ctrl+R pressed

```javascript
rlSystem.endEpisode('bankruptcy');
rlSystem.endEpisode('year_complete');
rlSystem.endEpisode('manual');
```

### Exporting Data

```javascript
// Keyboard shortcut
Ctrl+D  // Download JSON file

// Programmatic
const data = rlSystem.exportData();  // Get as object
rlSystem.downloadData();             // Trigger download
```

---

## Data Format

### Exported JSON Structure

```json
{
  "metadata": {
    "game": "Bloom",
    "version": "1.0",
    "stateSize": 22,
    "actionSize": 17,
    "exportTime": "2024-11-15T10:30:00.000Z",
    "totalEpisodes": 5,
    "totalTransitions": 1247
  },
  "episodes": [
    {
      "episode": 1,
      "steps": 256,
      "totalReward": 127.5,
      "terminalReason": "year_complete",
      "timestamp": "2024-11-15T10:00:00.000Z",
      "trajectory": [
        {
          "step": 0,
          "state": [0.48, 0.92, 0.83, 0.0, 0.1, ...],
          "action": 7,
          "actionName": "ADVANCE_TIME",
          "reward": 0.5,
          "nextState": [0.52, 0.92, 0.83, 0.33, 0.1, ...],
          "done": false,
          "timestamp": 1700000000000
        },
        {
          "step": 1,
          "state": [0.52, 0.92, 0.83, 0.33, 0.1, ...],
          "action": 11,
          "actionName": "SELL_COFFEE",
          "reward": 12.3,
          "nextState": [0.52, 0.92, 0.83, 0.33, 0.15, ...],
          "done": false,
          "timestamp": 1700000001000
        }
        // ... more transitions
      ]
    }
    // ... more episodes
  ],
  "statistics": {
    "avgReward": 95.2,
    "maxReward": 203.7,
    "minReward": -45.2,
    "avgEpisodeLength": 249.4
  }
}
```

### Transition Schema

Each transition contains:

| Field | Type | Description |
|-------|------|-------------|
| `step` | int | Step number within episode |
| `state` | float[22] | Normalized state vector before action |
| `action` | int | Action ID (0-16) |
| `actionName` | string | Human-readable action name |
| `reward` | float | Reward received |
| `nextState` | float[22] | State after action |
| `done` | bool | True if episode ended |
| `timestamp` | int | Unix timestamp (ms) |

---

## Training Approaches

### 1. Behavioral Cloning (Imitation Learning)

Learn to mimic human demonstrations:

```python
import torch
import torch.nn as nn

class PolicyNetwork(nn.Module):
    def __init__(self, state_size=22, action_size=17):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(state_size, 128),
            nn.ReLU(),
            nn.Linear(128, 128),
            nn.ReLU(),
            nn.Linear(128, action_size)
        )

    def forward(self, state):
        return self.net(state)

# Load data
with open('bloom_rl_data.json') as f:
    data = json.load(f)

# Prepare dataset
states = []
actions = []
for episode in data['episodes']:
    for transition in episode['trajectory']:
        states.append(transition['state'])
        actions.append(transition['action'])

states = torch.tensor(states, dtype=torch.float32)
actions = torch.tensor(actions, dtype=torch.long)

# Train
model = PolicyNetwork()
optimizer = torch.optim.Adam(model.parameters(), lr=1e-3)
criterion = nn.CrossEntropyLoss()

for epoch in range(100):
    logits = model(states)
    loss = criterion(logits, actions)
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()
    print(f"Epoch {epoch}, Loss: {loss.item():.4f}")
```

### 2. Offline RL (Conservative Q-Learning)

Learn from fixed dataset without environment interaction:

```python
# Using d3rlpy library
from d3rlpy.datasets import MDPDataset
from d3rlpy.algos import CQL

# Convert Bloom data to d3rlpy format
observations = []
actions = []
rewards = []
terminals = []

for episode in data['episodes']:
    for t in episode['trajectory']:
        observations.append(t['state'])
        actions.append(t['action'])
        rewards.append(t['reward'])
        terminals.append(t['done'])

dataset = MDPDataset(
    observations=np.array(observations),
    actions=np.array(actions),
    rewards=np.array(rewards),
    terminals=np.array(terminals)
)

# Train CQL
cql = CQL()
cql.fit(dataset, n_epochs=100)
```

### 3. Online RL (with Environment Wrapper)

For online training, wrap the game as a Gym environment:

```python
import gym
from gym import spaces
import numpy as np

class BloomEnv(gym.Env):
    def __init__(self, game_interface):
        super().__init__()
        self.game = game_interface

        self.observation_space = spaces.Box(
            low=0, high=1, shape=(22,), dtype=np.float32
        )
        self.action_space = spaces.Discrete(17)

    def reset(self):
        self.game.reset()
        return np.array(self.game.get_state_vector())

    def step(self, action):
        prev_state = self.game.get_state()
        self.game.execute_action(action)
        next_state = self.game.get_state()

        reward = self.game.calculate_reward(prev_state, next_state, action)
        done = self.game.is_terminal()

        return np.array(self.game.get_state_vector()), reward, done, {}

# Train with Stable Baselines3
from stable_baselines3 import PPO

env = BloomEnv(game_interface)
model = PPO("MlpPolicy", env, verbose=1)
model.learn(total_timesteps=100000)
```

---

## API Reference

### rlSystem Object

```javascript
window.rlSystem = {
  // === Properties ===
  enabled: boolean,         // Is recording active?
  recording: boolean,       // Currently in an episode?
  currentEpisode: number,   // Episode counter
  currentStep: number,      // Step within episode
  trajectory: Array,        // Current episode transitions
  episodes: Array,          // All completed episodes
  lastState: Object,        // Previous state (for reward calc)
  episodeReward: number,    // Cumulative reward this episode

  // === Constants ===
  ACTIONS: Object,          // Action ID mapping
  ACTION_NAMES: Object,     // Reverse mapping (ID → name)

  // === Methods ===
  init(),                   // Initialize system
  toggle(),                 // Toggle recording on/off
  startEpisode(),          // Begin new episode
  endEpisode(reason),      // End current episode

  getState(),              // Get full state object
  getStateVector(),        // Get normalized float array

  logAction(actionId, metadata),  // Record a transition
  calculateReward(prev, curr, action),  // Compute reward
  checkTerminal(),         // Check for episode end

  exportData(),            // Get all data as object
  downloadData(),          // Trigger JSON download
  getStats()               // Get summary statistics
}
```

### Keyboard Shortcuts

| Shortcut | Function |
|----------|----------|
| `Ctrl+R` | Toggle recording |
| `Ctrl+D` | Download data |
| `Ctrl+I` | Show statistics |

---

## Examples

### Example 1: Collecting 10 Episodes

```javascript
// In browser console
for (let i = 0; i < 10; i++) {
  rlSystem.startEpisode();

  // Play the game normally...
  // (or automate with test actions)

  rlSystem.endEpisode('manual');
}

rlSystem.downloadData();
```

### Example 2: Analyzing Collected Data

```python
import json
import matplotlib.pyplot as plt

with open('bloom_rl_data.json') as f:
    data = json.load(f)

# Plot reward distribution
rewards = [ep['totalReward'] for ep in data['episodes']]
plt.hist(rewards, bins=20)
plt.xlabel('Total Reward')
plt.ylabel('Count')
plt.title('Episode Reward Distribution')
plt.show()

# Action frequency
from collections import Counter
actions = []
for ep in data['episodes']:
    for t in ep['trajectory']:
        actions.append(t['actionName'])

action_counts = Counter(actions)
print("Most common actions:", action_counts.most_common(10))
```

### Example 3: State Analysis

```python
import numpy as np

# Extract all states
states = []
for ep in data['episodes']:
    for t in ep['trajectory']:
        states.append(t['state'])

states = np.array(states)

# Feature statistics
feature_names = [
    'day', 'month', 'season', 'phase', 'money', 'water_ratio',
    'power', 'fuel', 'worker_ratio', 'morale', 'energy',
    'plant_health', 'water_level', 'pests', 'diseased',
    'ripe', 'flowering', 'mature', 'cherries', 'beans',
    'player_x', 'player_y'
]

for i, name in enumerate(feature_names):
    print(f"{name}: mean={states[:,i].mean():.3f}, std={states[:,i].std():.3f}")
```

---

## Future Enhancements

1. **WebSocket API**: External agent control without browser automation
2. **Action masking**: Prevent invalid actions
3. **Observation stacking**: Include last N states for temporal context
4. **Reward normalization**: Running mean/std normalization
5. **Checkpoint saving**: Resume training from saved model
6. **Multi-agent**: Simulate competing estates

---

*For questions or contributions, see the main repository README.*
