# Bloom - Gameplay Guide

*A complete guide to running your coffee estate in the hills of Coorg*

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Understanding the Estate](#understanding-the-estate)
3. [The Coffee Cycle](#the-coffee-cycle)
4. [Managing Resources](#managing-resources)
5. [Hiring and Managing Workers](#hiring-and-managing-workers)
6. [Mini-Games](#mini-games)
7. [Random Events](#random-events)
8. [Selling Your Coffee](#selling-your-coffee)
9. [Tips for Success](#tips-for-success)
10. [Controls Reference](#controls-reference)

---

## Getting Started

### Opening the Game

1. Open `index.html` in a modern web browser (Chrome recommended)
2. Press **ENTER** on the start screen
3. Create your character:
   - Choose Boy or Girl
   - Enter your name (up to 12 characters)
4. Press **ENTER** to begin

### The Tutorial

When you first start, Dad offers to teach you the basics. We recommend completing the tutorial on your first playthrough. You can skip it if you're familiar with the game.

---

## Understanding the Estate

### The Map

Your plantation is a 40x30 tile estate with several key areas:

| Area | Location | Purpose |
|------|----------|---------|
| **Arabica Section** | Upper fields | Premium coffee, needs more care |
| **Robusta Section** | Lower fields | Hardy variety, higher yield |
| **Processing Shed** | Center | Pulp and process cherries |
| **Drying Yards** | Near shed | Dry processed beans |
| **Fermentation Tanks** | Processing area | Wet process fermentation |
| **Water Tank** | Near entrance | Water storage display |
| **Worker Quarters** | Lower area | Where workers rest |
| **Phone Booth** | Near entrance | Hire workers, buy supplies |
| **Notice Board** | Entrance | Market prices, weather info |
| **Storage** | Lower area | View inventory |

### Navigation

Move around the estate using **WASD** or **Arrow Keys**. Interact with objects and NPCs by facing them and pressing **E** or **Space**.

---

## The Coffee Cycle

Coffee farming follows a yearly cycle with six seasons:

### Season Calendar

| Season | Months | Key Activities |
|--------|--------|----------------|
| **Post-Harvest** | Jan-Feb | Pruning, processing remaining beans, maintenance |
| **Blossom** | Mar-Apr | Flowering triggered by blossom showers |
| **Planting** | May | Plant new seedlings before monsoon |
| **Monsoon** | Jun-Sep | Heavy growth, berry development, pest risk |
| **Ripening** | Oct-Nov | Berries turn from green to red |
| **Harvest** | Nov-Feb | Pick ripe cherries, process beans |

### Plant Growth Stages

```
SEEDLING → YOUNG → MATURE → FLOWERING → GREEN_BERRY → RIPE → OVERRIPE
   │         │        │          │            │          │         │
 60-90d   180-270d  Blossom   7-14d      120-150d    Harvest!   Quality↓
                    Season
```

- **Seedling**: Needs water, no yield
- **Young**: Growing, still no yield
- **Mature**: Ready to flower when blossom showers come
- **Flowering**: White blossoms cover the plant
- **Green Berry**: Cherries forming, not ready
- **Ripe**: RED cherries - harvest now!
- **Overripe**: Quality decreasing, harvest immediately

---

## Managing Resources

### The HUD

The top bar shows your current resources:

```
┌─────────────────────────────────────────────────────────────┐
│ Morning | Nov 1, 2024 | Harvest Season                      │
│ ₹50,000 | 3000L | Grid OK | 0 Workers    [Dashboard] [End]  │
└─────────────────────────────────────────────────────────────┘
```

### Money (₹)

- **Starting amount**: ₹50,000
- **Income**: Selling processed coffee beans
- **Expenses**: Worker wages, supplies, emergency purchases
- **Bankruptcy**: Game over if money reaches ₹0

### Water

- **Tank capacity**: 5,000 liters
- **Consumption**:
  - Workers: 10L per worker per day
  - Plants: 2L per plant in dry season
- **Replenishment**:
  - Monsoon rains auto-fill the tank
  - Purchase tanker water: ₹5,000 for 2,000L
  - Borewell (one-time): ₹50,000 for permanent supply

### Power

- **Grid**: Usually available, occasional outages during monsoon
- **Generator**: Backup power, consumes 5L fuel per day
- **Impact**: Processing equipment needs power to operate

### Supplies

Purchase from the Phone Booth:

| Supply | Cost | Use |
|--------|------|-----|
| Fertilizer | ₹500/bag | Boost plant growth |
| Pesticide | ₹300/can | Treat pest infestations |
| Seedlings | ₹200/plant | Plant new coffee trees |

---

## Hiring and Managing Workers

### Worker Types

| Type | Daily Wage | Skills |
|------|------------|--------|
| **Picker** | ₹600 | Harvests ripe cherries |
| **Processor** | ₹500 | Pulping, drying, sorting |
| **Maintenance** | ₹450 | Watering, pruning, pest control |

### Hiring Workers

1. Go to the **Phone Booth** and interact (E)
2. Or open **Dashboard → Workers → Hire**
3. Available workers shown with their stats
4. Click "Hire" to add them (max 10 workers)

### Worker Properties

- **Morale** (0-100): Affects work quality. Pay on time to maintain!
- **Energy** (0-100): Depletes during work, recovers overnight
- **Efficiency**: Combination of morale and energy

### Labor Shortage

During **Harvest Season**, fewer workers are available for hire. Plan ahead and hire workers in Ripening season before the rush!

### Wages

Workers are paid weekly (every 7 days). Ensure you have enough money or morale will drop and workers may leave.

---

## Mini-Games

### Cherry Picking

**When**: Interact with ripe plants during Harvest season

**How to Play**:
- 60-second time limit
- Click on cherries to pick them
- **Red cherries**: +10 points (ripe - pick these!)
- **Green cherries**: -5 points (unripe - avoid!)
- **Dark cherries**: +3 points (overripe - okay to pick)

**Tips**:
- Focus on red cherries first
- Avoid clicking green ones
- Speed matters - maximize picks in 60 seconds

**Rewards**: Cherries harvested are added to your inventory based on score.

---

### Bean Sorting

**When**: Interact with Sorting Table when you have parchment beans

**How to Play**:
- Beans scroll across a conveyor belt
- Sort each bean into the correct grade bin
- Use keyboard: **1** (MNEB), **2** (A), **3** (B), **4** (C), **R** (Reject)
- Or click/drag beans to bins

**Grading Criteria**:

| Grade | Size | Color | Shape | Price |
|-------|------|-------|-------|-------|
| MNEB | Large | Even | Round | Highest |
| A | Good | Good | Good | High |
| B | Medium | Okay | Okay | Medium |
| C | Small | Uneven | Irregular | Low |
| Reject | Defective | Bad | Broken | None |

**Tips**:
- Speed increases over time
- Accuracy affects final inventory quality
- When in doubt, grade lower (B instead of A)

---

### Processing

**When**: Interact with Processing Shed or Fermentation Tank with cherries

#### Wet Processing (Arabica)

1. **Pulping**: Tap/click rapidly to remove cherry skin
   - Progress bar fills with each tap
   - Complete within time limit

2. **Fermentation**: Critical timing!
   - Optimal: **36-48 hours** (+10 quality)
   - Under 12 hours: Sour taste (-20 quality)
   - Over 60 hours: Quality degrades rapidly
   - Click "Check & Advance" to progress

3. **Washing**: Quick tap sequence to clean beans

4. **Drying**: Turn beans periodically over several days

#### Dry Processing (Robusta)

1. Spread cherries evenly on drying yard
2. Turn 3 times per day for 14-21 days
3. Monitor moisture progress bar
4. Hull when fully dry

**Tips**:
- Fermentation timing is the most important factor
- Check beans regularly during fermentation
- Don't rush drying - patience yields quality

---

## Random Events

Events can occur at the start of any day. They present challenges and choices:

### Pest Events

| Event | Season | Effect | Options |
|-------|--------|--------|---------|
| **Berry Borer** | Ripening, Harvest | Pest infects plants | Spray (₹2K), Predators (₹5K), Ignore |
| **Stem Borer** | Monsoon, Post-Harvest | -40 plant health | Treatment (₹10K), Remove plants, Expert (₹3K) |
| **Leaf Rust** | Monsoon | Fungal infection | Fungicide (₹3K), Prune affected |

### Weather Events

| Event | Season | Effect | Options |
|-------|--------|--------|---------|
| **Drought** | Blossom, Post-Harvest | -50% water | Tanker (₹5K), Ration, Borewell (₹50K) |
| **Blossom Showers** | Blossom | Triggers flowering! | (Positive event) |
| **Power Cut** | Monsoon | Grid down 3 days | Use generator, Wait |

### Labor Events

| Event | Season | Effect | Options |
|-------|--------|--------|---------|
| **Labor Shortage** | Harvest | 30% fewer workers available | Raise wages, Temp agency, Family helps |
| **Festival** | Various | Workers take day off | Pay bonus, Let them go |

### Responding to Events

- Events pause the game and show a modal
- Read Dad's advice (shown in the event)
- Choose an option based on your resources
- Some options cost money but prevent bigger losses

---

## Selling Your Coffee

### Market Prices

Check the **Notice Board** for current prices, or open **Dashboard → Market**.

Prices fluctuate based on:
- **Season**: Higher during off-season
- **Demand**: Random market conditions
- **Grade**: MNEB commands premium prices

### Base Prices (per kg)

| Coffee | MNEB | Grade A | Grade B | Grade C |
|--------|------|---------|---------|---------|
| Arabica | ₹400-500 | ₹310-390 | ₹250-310 | ₹175-225 |
| Robusta | - | ₹160-200 | ₹125-155 | ₹90-110 |

### How to Sell

1. Open **Dashboard → Market** or interact with Notice Board
2. Select coffee type (Arabica/Robusta)
3. Select grade (MNEB, A, B, C)
4. Enter quantity (or click "Max")
5. Review total and click "Sell"

**Tips**:
- Don't sell everything at once - prices change!
- MNEB Arabica is your most valuable product
- Robusta sells for less but yields more

---

## Tips for Success

### Early Game (Year 1)

1. Complete the tutorial to understand mechanics
2. Start with 2-3 maintenance workers
3. Keep plants watered in dry season
4. Save money for emergencies (keep ₹20,000 reserve)

### Harvest Preparation

1. Hire pickers in **Ripening** season (before shortage)
2. Stock up on supplies
3. Ensure water tank is full
4. Check all plants are healthy

### During Harvest

1. Prioritize ripe plants (they become overripe!)
2. Process cherries quickly
3. Watch fermentation timing carefully
4. Sort beans accurately for best grades

### Financial Management

- **Weekly wages**: Budget for worker payments
- **Emergency fund**: Keep ₹20,000+ for events
- **Invest wisely**: Borewell pays off long-term
- **Sell strategically**: Wait for good prices

### Common Mistakes to Avoid

1. **Hiring too late**: Workers scarce during harvest
2. **Ignoring pests**: Small problem becomes disaster
3. **Bad fermentation**: Ruins entire batch
4. **Spending everything**: No buffer for emergencies
5. **Forgetting to water**: Plants die in dry season

---

## Controls Reference

### Keyboard

| Key | Action |
|-----|--------|
| `W` / `↑` | Move up |
| `S` / `↓` | Move down |
| `A` / `←` | Move left |
| `D` / `→` | Move right |
| `E` / `Space` | Interact |
| `Enter` | Confirm / Advance dialogue |
| `Escape` | Close menus |
| `M` | Quick save |

### Mini-Game Controls

| Game | Controls |
|------|----------|
| Cherry Picking | Click cherries |
| Bean Sorting | `1-4` for grades, `R` for reject, or click bins |
| Processing | Click/tap rapidly, or click buttons |

### Mobile Controls

On touch devices:
- **D-Pad**: Virtual directional buttons (left side)
- **A Button**: Interact (right side)
- **Menu Button**: Open menu (right side)

### Dashboard

Click the **Dashboard** button or use the menu to access:
- **Overview**: Season, money, quick stats
- **Plants**: Health grid, growth stages
- **Workers**: List, assignments, morale
- **Inventory**: All coffee at each processing stage
- **Market**: Current prices, sell interface

---

## Saving Your Progress

- **Auto-save**: Game saves automatically after major actions
- **Manual save**: Press `M` or access through menu
- **Load**: Saved data persists in browser localStorage

---

*Good luck with your estate! May your harvests be bountiful and your coffee exceptional.*
