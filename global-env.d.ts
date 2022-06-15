declare type ReactNode = React.ReactNode;
declare type ReactElement = React.ReactElement;
declare var ramda: any;

// Useful library, but boy they need better typescript support.
declare module 'ramda' {
  export = ramda;
}
