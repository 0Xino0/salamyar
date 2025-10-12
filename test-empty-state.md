# Empty State Message Test

## Expected Behavior

The message "فهرست محصولات انتخابی شما خالی است" should only appear when:

1. ✅ **Initial page load**: No message shown (hasEverSelectedProducts = false)
2. ✅ **After selecting and removing all products**: Message shown (hasEverSelectedProducts = true)
3. ✅ **After selecting products**: Normal list shown (hasEverSelectedProducts = true)

## Implementation Details

### useSelectedProducts Hook Changes:
- Added `hasEverSelectedProducts` state to track if any products have been selected
- Set to `true` when:
  - Products are loaded from backend (if any exist)
  - A product is successfully selected

### SelectedProductsList Component Changes:
- Added `hasEverSelectedProducts` prop
- Updated condition: `if (selectedProducts.length === 0 && hasEverSelectedProducts)`
- Returns `null` if no products and never selected any

### App Component Changes:
- Passes `hasEverSelectedProducts` prop to SelectedProductsList

## Test Scenarios

1. **Fresh page load**: No empty state message
2. **Select a product**: Product appears in list
3. **Remove the product**: Empty state message appears
4. **Select another product**: Message disappears, product appears
5. **Remove all products**: Empty state message appears again

## Files Modified:
- `salamyar/src/hooks/useSelectedProducts.ts`
- `salamyar/src/components/SelectedProductsList.tsx`
- `salamyar/src/App.tsx`
