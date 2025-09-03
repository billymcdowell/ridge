export interface ComponentEventDetail {
    originalEvent?: Event;
    [key: string]: any;
  }
  
  export interface CustomEventInit<T = any> extends EventInit {
    detail?: T;
  }
  
  export type ThemeMode = 'light' | 'dark' | 'auto';
  
  export interface BaseComponentProps {
    theme?: ThemeMode;
  }