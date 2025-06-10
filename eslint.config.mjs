// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    // ESLint가 검사하지 않을 파일들
    ignores: ['eslint.config.mjs'],
  },
  // 기본 ESLint 권장 규칙들
  eslint.configs.recommended,
  // TypeScript ESLint 권장 규칙들 (타입 체크 포함)
  ...tseslint.configs.recommendedTypeChecked,
  // Prettier와 ESLint 통합을 위한 권장 설정
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        // Node.js 환경의 전역 변수들 (process, __dirname 등)
        ...globals.node,
        // Jest 테스트 환경의 전역 변수들 (describe, it, expect 등)
        ...globals.jest,
      },
      // 모듈 시스템 설정 (require/module.exports 사용)
      sourceType: 'commonjs',
      parserOptions: {
        // TypeScript 프로젝트 서비스 활성화
        projectService: true,
        // tsconfig.json을 찾을 루트 디렉토리
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      // TypeScript any 타입 사용 허용
      '@typescript-eslint/no-explicit-any': 'off',
      // Promise를 await하지 않으면 경고
      '@typescript-eslint/no-floating-promises': 'warn',
      // 안전하지 않은 인수 전달시 경고
      '@typescript-eslint/no-unsafe-argument': 'warn',
      
      // Prettier 포맷팅 규칙 설정
      'prettier/prettier': [
        'error',
        {
          // 문자열에 작은따옴표 사용 ('hello' vs "hello")
          singleQuote: true,
          // 세미콜론 사용 (true로 변경하면 자동으로 세미콜론 추가됨)
          semi: true, // ← 이 부분을 true로 변경
          // 탭 대신 스페이스 사용
          useTabs: false,
          // 들여쓰기 스페이스 개수
          tabWidth: 2,
          // 배열/객체 마지막 요소 뒤 쉼표 ('es5', 'all', 'none')
          trailingComma: 'none',
          // 한 줄 최대 길이
          printWidth: 80,
          // 객체 중괄호 내부에 공백 추가 ({ foo } vs {foo})
          bracketSpacing: true,
          // 화살표 함수 매개변수 괄호 ('always', 'avoid')
          arrowParens: 'always',
          // 줄바꿈 문자 설정 (Windows/Unix 호환)
          endOfLine: 'auto'
        }
      ]
    },
  },
);