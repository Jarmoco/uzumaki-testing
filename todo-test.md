# Uzumaki UI Test Plan

## Pending Library Bugs

### 1. `visible` prop (Issue #4)
**Status**: Library bug - needs fix in uzumaki-ui
**Location**: `src/index.tsx:823-828` (LayoutPage)

**Current behavior**: Elements with `visible={true/false}` always render regardless of prop value

**Expected behavior**: 
- `visible={true}` → element is visible
- `visible={false}` → element is hidden (display: none or not rendered)

**Test**:
```
Toggle "Reveal it" / "Hide it" button in Layout Lab
Expected: One view shows, other hides based on toggle state
```

---

### 2. `cursor` prop (Issue #5)
**Status**: Library bug - prop handler is empty, needs implementation
**Location**: `src/index.tsx:947-965` (StressPage)

**Current behavior**: No mouse cursor change on hover

**Expected behavior**:
- `cursor="default"` → cursor: default
- `cursor="pointer"` → cursor: pointer  
- `cursor="text"` → cursor: text
- `cursor="crosshair"` → cursor: crosshair
- `cursor="not-allowed"` → cursor: not-allowed
- `cursor="grab"` → cursor: grab

**Test**: Hover over each button in "Cursor kinds" section - cursor should change accordingly

---

## Additional Issue

### 3. `fontWeight` prop
**Status**: Unknown - needs investigation
**Location**: Multiple places in code (all `<text>` elements)

**Current behavior**: Text renders but fontWeight appears to have no effect; prop requires string type

**Expected behavior**:
- `fontWeight={400}` (or `"400"`) → normal weight
- `fontWeight={700}` (or `"700"`) → bold
- `fontWeight={900}` (or `"900"`) → extra bold

**Note**: Font weights should accept numbers per CSS spec (100-900), but Uzumaki may require strings

**Test**: Check text elements in DashboardPage stat cards - values like "42" (CPU), "67" (Memory) should show weight differences when fontWeight changes

---

## Test Commands

```bash
npm run dev
```

Navigate to:
- **Layout Lab** → "visible prop" section → test toggle button
- **Stress Test** → "Cursor kinds" section → hover to test cursor changes
- **Dashboard** → stat cards → check fontWeight rendering differences