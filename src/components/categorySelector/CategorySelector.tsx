import * as S from './CategorySelector.styles'

type CategorySelectorProps<T extends string> = {
  categories: readonly T[]
  selectedCategory: T
  onCategoryChange: (category: T) => void
  getCategoryLabel?: (category: T) => string
  ariaLabel?: string
}

function CategorySelector<T extends string>({
  categories,
  selectedCategory,
  onCategoryChange,
  getCategoryLabel = (category) => category,
  ariaLabel = 'Filtrar por categoría',
}: CategorySelectorProps<T>) {
  return (
    <S.Filters aria-label={ariaLabel}>
      {categories.map((category) => {
        const isActive = category === selectedCategory

        return (
          <S.FilterButton
            key={category}
            type="button"
            $active={isActive}
            aria-pressed={isActive}
            onClick={() => onCategoryChange(category)}
          >
            {getCategoryLabel(category)}
          </S.FilterButton>
        )
      })}
    </S.Filters>
  )
}

export default CategorySelector
