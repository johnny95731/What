declare module '*.vue';

declare module '*.png?url' {
  const content: string;
  export default content;
};
