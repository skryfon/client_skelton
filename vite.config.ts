import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { NativeFederationTestsHost } from '@module-federation/native-federation-tests/vite';
import { NativeFederationTypeScriptHost } from '@module-federation/native-federation-typescript/vite';
import packageJson from './package.json';
import federation from "@originjs/vite-plugin-federation";
import path from "path"
import tailwindcss from "@tailwindcss/vite"



// Function to filter dependencies
const filterDependencies = (deps: Record<string, string>, excludeList: string[]) => {
  const filtered = { ...deps };
  excludeList.forEach(dep => delete filtered[dep]);
  return filtered;
};

// List of dependencies to exclude
const excludeDependencies = [
  'tailwindcss',
  'tailwind-merge',
  'class-variance-authority',
  'clsx',
  "lucide-react",
  "@radix-ui/react-dialog",
  "@radix-ui/react-separator",
  "@radix-ui/react-slot",
  "@radix-ui/react-tooltip"
  // Add more as needed
];

const filteredDependencies = filterDependencies(packageJson.dependencies, excludeDependencies);

const moduleFederationConfig = {
  name: 'remoteRepo',
  filename: 'remoteEntry.js',
  remotes: {
    remoteRepo: 'http://localhost:3000/dist/assets/remoteEntry.js',
  },
  shared: {
    ...filteredDependencies,
    react: { singleton: true, eager: true, requiredVersion: packageJson.dependencies.react },
    'react-dom': {
      singleton: true,
      eager: true,
      requiredVersion: packageJson.dependencies['react-dom'],
    },
  },
};
const typeConfig = {
  ...moduleFederationConfig, remotes: {
    remoteRepo: 'http://localhost:3000/dist',
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    NativeFederationTypeScriptHost({ moduleFederationConfig: typeConfig }),
    NativeFederationTestsHost({ moduleFederationConfig: typeConfig }),
    federation(moduleFederationConfig),

  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
},
)
