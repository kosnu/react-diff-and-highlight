import type { Meta, StoryObj } from "@storybook/react"
import DiffHighlighter from "../DiffHighlighter"

const meta: Meta<typeof DiffHighlighter> = {
  title: "Components/DiffHighlighter",
  component: DiffHighlighter,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A React component for displaying text diffs and highlighting keywords.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    original: {
      control: "text",
      description: "Original text to compare",
    },
    modified: {
      control: "text",
      description: "Modified text to compare against original",
    },
    highlightWords: {
      control: "object",
      description: "Array of words to highlight in the text",
    },
    highlightColor: {
      control: "color",
      description: "Color for highlighted words",
    },
    className: {
      control: "text",
      description: "CSS class name for the root element",
    },
    inlineDiff: {
      control: "boolean",
      description: "Show inline character-level differences",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    original: "Hello world\nThis is a test\nAnother line",
    modified: "Hello React\nThis is a test\nAnother line\nNew line added",
    highlightWords: [],
    highlightColor: "#ffeb3b",
    inlineDiff: false,
  },
}

export const WithHighlights: Story = {
  args: {
    original: 'const greeting = "Hello world";\nconsole.log(greeting);',
    modified:
      'const greeting = "Hello React";\nconsole.log(greeting);\nconsole.log("New message");',
    highlightWords: ["React", "console", "const"],
    highlightColor: "#4caf50",
    inlineDiff: false,
  },
}

export const InlineDiff: Story = {
  args: {
    original: "The quick brown fox jumps over the lazy dog",
    modified: "The quick red fox runs over the sleepy cat",
    highlightWords: ["fox", "over", "red"],
    highlightColor: "#ff9800",
    inlineDiff: true,
  },
}

export const CodeComparison: Story = {
  args: {
    original: `function calculateSum(a, b) {
  return a + b;
}

const result = calculateSum(5, 3);
console.log(result);`,
    modified: `function calculateSum(a, b) {
  const sum = a + b;
  return sum;
}

const result = calculateSum(10, 7);
console.log("Result:", result);`,
    highlightWords: ["function", "const", "return"],
    highlightColor: "#e91e63",
    inlineDiff: true,
  },
}

export const LongText: Story = {
  args: {
    original: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco.
Duis aute irure dolor in reprehenderit in voluptate velit esse.
Excepteur sint occaecat cupidatat non proident, sunt in culpa.`,
    modified: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco.
Duis aute irure dolor in reprehenderit in voluptate velit esse.
Excepteur sint occaecat cupidatat non proident, sunt in culpa.
Qui officia deserunt mollit anim id est laborum.
Sed ut perspiciatis unde omnis iste natus error sit.`,
    highlightWords: ["Lorem", "dolor", "elit", "laborum"],
    highlightColor: "#9c27b0",
    inlineDiff: false,
  },
}

export const CustomStyling: Story = {
  args: {
    original: "Original content here",
    modified: "Modified content here with changes",
    highlightWords: ["content", "changes"],
    highlightColor: "#00bcd4",
    className: "custom-diff-container",
    inlineDiff: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Example showing how to apply custom CSS classes to the component.",
      },
    },
  },
}
