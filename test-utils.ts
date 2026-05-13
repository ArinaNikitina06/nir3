/**
 * Утилиты для тестирования Redux store
 * 
 * Использование:
 * import { createTestStore } from './test-utils';
 * 
 * const store = createTestStore({
 *   burgerConstructor: { bun: null, list: [] }
 * });
 */

import { configureStore, PreloadedState } from '@reduxjs/toolkit';
import { constructorReducer } from './path/to/constructorReducer'; // замените на ваш путь

// Тип состояния для тестового store
export type TestState = {
  burgerConstructor: ReturnType<typeof constructorReducer>;
};

/**
 * Создает тестовый store с указанным начальным состоянием
 * 
 * @param preloadedState - начальное состояние для store
 * @returns настроенный store для тестов
 */
export function createTestStore(
  preloadedState?: PreloadedState<TestState>
) {
  return configureStore({
    reducer: {
      burgerConstructor: constructorReducer
    },
    preloadedState
  });
}

/**
 * Получает тип состояния из store
 * Используется для типизации в тестах
 */
export type TestStore = ReturnType<typeof createTestStore>;
export type TestStoreState = ReturnType<TestStore['getState']>;
