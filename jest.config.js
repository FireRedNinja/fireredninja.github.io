module.exports = {
  // Use babel-jest for source files, ts-jest for test files
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: {
          jsx: 'react',
          esModuleInterop: true,
          allowSyntheticDefaultImports: true,
        },
      },
    ],
  },

  // Use jsdom for browser environment simulation
  testEnvironment: 'jsdom',

  // Module name mapping for imports
  moduleNameMapper: {
    // Handle CSS imports (with CSS modules)
    '\\.css$': 'identity-obj-proxy',

    // Handle image imports
    '\\.(jpg|jpeg|png|gif|svg|webp)$': '<rootDir>/__mocks__/fileMock.js',

    // Handle Gatsby imports
    '^gatsby$': '<rootDir>/__mocks__/gatsby.tsx',
    '^gatsby-plugin-image$': '<rootDir>/__mocks__/gatsby-plugin-image.tsx',
  },

  // Setup files
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  // Transform ignore patterns - include gatsby packages
  transformIgnorePatterns: ['node_modules/(?!(gatsby|gatsby-plugin-image)/)'],

  // Test match patterns
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(test).ts?(x)'],

  // Ignore patterns
  testPathIgnorePatterns: ['/node_modules/', '/.cache/', '/public/'],

  // Globals for Gatsby
  globals: {
    __PATH_PREFIX__: '',
    __BASE_PATH__: '',
  },

  // Coverage configuration
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/gatsby-*.ts',
    '!src/gatsby-*.tsx',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },

  // Module file extensions
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
};
