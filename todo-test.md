# Uzumaki UI Test Plan

## Cursor prop
<text> elements automatically get a cursor=text prop assigned to them, behaviour visible in @StressPage.tsx:126
The issue fixes itself when "hover:color={C.text}" is removed, but this shouldn't affect the cursor type

## `fontWeight` prop
**Status**: Unknown - needs investigation
**Location**: Multiple places in code (all `<text>` elements)

**Current behavior**: Text renders but fontWeight appears to have no effect; prop requires string type

**Expected behavior**:
- `fontWeight={400}` (or `"400"`) → normal weight
- `fontWeight={700}` (or `"700"`) → bold
- `fontWeight={900}` (or `"900"`) → extra bold

**Note**: Font weights should accept numbers per CSS spec (100-900), but Uzumaki may require strings

**Test**: Check text elements in DashboardPage stat cards - values like "42" (CPU), "67" (Memory) should show weight differences when fontWeight changes