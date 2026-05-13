# Решение проблемы типизации store.getState() в Redux Toolkit тестах

## Проблема

При тестировании Redux селекторов с использованием `configureStore` TypeScript выдает ошибку типизации:

```typescript
const store = configureStore({
  reducer: {
    burgerConstructor: constructorReducer
  }
});

// ❌ Ошибка: TypeScript ожидает полный RootState
const bun = selectConstructorBun(store.getState());
```

**Причина**: `configureStore` типизирован для полного состояния приложения, но в тестах мы используем только часть редьюсеров.

## Решения

### ✅ Решение 1: ReturnType (Рекомендуется)

Используйте `ReturnType` для получения типа состояния из тестового store:

```typescript
it('selectConstructorBun', () => {
  const store = configureStore({
    reducer: {
      burgerConstructor: constructorReducer
    },
    preloadedState: {
      burgerConstructor: initialState
    }
  });
  
  type TestState = ReturnType<typeof store.getState>;
  const bun = selectConstructorBun(store.getState() as TestState);
  
  expect(bun).toBeNull();
});
```

**Плюсы**: Типобезопасно, автоматически синхронизируется с store
**Минусы**: Нужно добавлять `as` в каждом тесте

### ✅ Решение 2: Type Assertion (Самое простое)

Используйте type assertion напрямую:

```typescript
it('selectConstructorBun', () => {
  const store = configureStore({
    reducer: {
      burgerConstructor: constructorReducer
    }
  });
  
  // Вариант A: as any (быстро, но теряет типизацию)
  const bun = selectConstructorBun(store.getState() as any);
  
  // Вариант B: конкретный тип (более безопасно)
  const bun = selectConstructorBun(
    store.getState() as { burgerConstructor: typeof initialState }
  );
});
```

**Плюсы**: Быстро, не требует дополнительных типов
**Минусы**: Может скрыть ошибки типизации

### ✅ Решение 3: Helper функция (Лучше для переиспользования)

Создайте helper функцию для создания тестового store:

```typescript
// test-utils.ts
export function createTestStore(preloadedState?: PreloadedState<TestState>) {
  return configureStore({
    reducer: {
      burgerConstructor: constructorReducer
    },
    preloadedState
  });
}

export type TestStore = ReturnType<typeof createTestStore>;
export type TestStoreState = ReturnType<TestStore['getState']>;

// В тесте:
import { createTestStore, TestStoreState } from './test-utils';

it('selectConstructorBun', () => {
  const store = createTestStore({
    burgerConstructor: initialState
  });
  
  const bun = selectConstructorBun(store.getState() as TestStoreState);
});
```

**Плюсы**: Переиспользуемо, централизованная типизация
**Минусы**: Требует дополнительного файла

### ✅ Решение 4: Partial<RootState>

Если у вас есть `RootState` тип в основном приложении:

```typescript
import type { RootState } from './path/to/store';

const bun = selectConstructorBun(store.getState() as Partial<RootState>);
```

**Плюсы**: Использует существующие типы
**Минусы**: Требует наличия RootState типа

## Рекомендация

Для большинства случаев используйте **Решение 1 (ReturnType)** или **Решение 3 (Helper функция)**. Они обеспечивают баланс между типобезопасностью и удобством использования.

## Пример полного теста

```typescript
import { configureStore } from '@reduxjs/toolkit';
import { constructorReducer } from './constructorReducer';
import { selectConstructorBun } from './selectors';

describe('selectConstructorBun', () => {
  const initialState = {
    bun: null,
    list: []
  };

  it('should return bun from state', () => {
    const store = configureStore({
      reducer: {
        burgerConstructor: constructorReducer
      },
      preloadedState: {
        burgerConstructor: initialState
      }
    });
    
    type TestState = ReturnType<typeof store.getState>;
    const bun = selectConstructorBun(store.getState() as TestState);
    
    expect(bun).toBeNull();
  });
});
```
