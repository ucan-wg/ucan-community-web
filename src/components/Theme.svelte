<script lang="ts">
  type Theme = 'white' | 'g10' | 'g90' | 'g100' | 'mechtel';

  export let persist: boolean = false;
  export let persistKey: string = 'theme';
  export let theme: Theme = 'white';
  export const themes: Theme[] = ['white', 'g10', 'g90', 'g100', 'mechtel'];

  import { onMount, afterUpdate, setContext } from 'svelte';
  import { writable, derived } from 'svelte/store';

  const isValidTheme = (value: Theme) => themes.includes(value);
  const isDark = (value: Theme) => isValidTheme(value) && (value === 'g90' || value === 'g100');

  const carbon_theme = writable(theme);
  const dark = writable(isDark(theme));
  const light = derived(dark, (_) => !_);

  const unsubscribe = carbon_theme.subscribe(value => {
    theme = value;
  });

  let _document: Document | null = null;

  setContext('Theme', {
    updateVar: (name: string, value: string) => {
      if (_document != null) {
        _document.documentElement.style.setProperty(name, value);
      }
    },
    carbon_theme,
    dark,
    light
  });

  onMount(() => {
    _document = window.document;

    try {
      const persisted_theme = localStorage.getItem(persistKey);

      if (isValidTheme(persisted_theme as Theme)) {
        theme = persisted_theme as Theme;
      }
    } catch (error) {
      console.error(error);
    }
  });

  afterUpdate(() => {
    if (isValidTheme(theme)) {
      if (_document != null) {
        _document.documentElement.setAttribute('theme', theme);
      }

      if (persist) {
        localStorage.setItem(persistKey, theme);
      }
    } else {
      console.warn(
        `"${theme}" is not a valid Carbon theme. Choose from available themes: ${JSON.stringify(
          themes
        )}`
      );
    }
  });

  $: dark.set(isDark(theme));
</script>

<slot />
