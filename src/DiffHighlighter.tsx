import { type Change, diffLines, diffWordsWithSpace } from "diff"
import type React from "react"
import styles from "./DiffHighlighter.module.css"

export interface DiffHighlighterProps {
  original: string
  modified: string
  highlightWords: string[]
  highlightColor?: string
  className?: string
  inlineDiff?: boolean
}

interface DiffLine {
  content: string
  type: "added" | "removed" | "unchanged"
  lineNumber?: number
}

const DiffHighlighter: React.FC<DiffHighlighterProps> = ({
  original,
  modified,
  highlightWords,
  highlightColor = "#ffeb3b",
  className = "",
  inlineDiff = false,
}) => {
  function highlightText(text: string): React.ReactNode {
    if (highlightWords.length === 0) return text

    const parts: React.ReactNode[] = []
    let lastIndex = 0

    highlightWords.forEach((word) => {
      const regex = new RegExp(
        `(${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
        "gi",
      )
      const matches = Array.from(text.matchAll(regex))

      matches.forEach((match) => {
        if (match.index !== undefined) {
          if (lastIndex < match.index) {
            parts.push(text.slice(lastIndex, match.index))
          }
          parts.push(
            <mark
              key={`${match.index}-${word}`}
              style={{
                backgroundColor: highlightColor,
              }}
              className={styles.dhHighlight}
            >
              {match[0]}
            </mark>,
          )
          lastIndex = match.index + match[0].length
        }
      })
    })

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex))
    }

    return parts.length > 0 ? parts : text
  }

  function renderInlineDiff(line: DiffLine): React.ReactNode {
    if (!inlineDiff || line.type === "unchanged") {
      return highlightText(line.content)
    }

    const words = diffWordsWithSpace(original, line.content)

    return words.map((part: Change, index: number) => {
      const content = highlightText(part.value)
      if (part.added) {
        return (
          <span
            // biome-ignore lint/suspicious/noArrayIndexKey: 与えられた文字列を表示するだけなので許可
            key={index}
            className={styles.dhHighlightAdded}
          >
            {content}
          </span>
        )
      } else if (part.removed) {
        return (
          <span
            // biome-ignore lint/suspicious/noArrayIndexKey: 与えられた文字列を表示するだけなので許可
            key={index}
            className={styles.dhHighlightRemoved}
          >
            {content}
          </span>
        )
      }

      // biome-ignore lint/suspicious/noArrayIndexKey: 与えられた文字列を表示するだけなので許可
      return <span key={index}>{content}</span>
    })
  }

  const diffResult = diffLines(original, modified)
  const processedLines: DiffLine[] = []

  diffResult.forEach((part: Change) => {
    const lines = part.value.split("\n")
    if (lines[lines.length - 1] === "") {
      lines.pop()
    }

    lines.forEach((line: string) => {
      if (part.added) {
        processedLines.push({ content: line, type: "added" })
      } else if (part.removed) {
        processedLines.push({ content: line, type: "removed" })
      } else {
        processedLines.push({ content: line, type: "unchanged" })
      }
    })
  })

  return (
    <div className={[styles.dhRoot, className].join(" ")}>
      <div
        style={{
          border: "1px solid #e0e0e0",
          borderRadius: "4px",
          overflow: "hidden",
        }}
      >
        {processedLines.map((line, index) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: 与えられた文字列を表示するだけなので許可
            key={index}
            data-line-type={line.type}
            className={styles.dhLine}
          >
            <span className={styles.dhLineIcon}>
              {line.type === "added"
                ? "+"
                : line.type === "removed"
                  ? "-"
                  : " "}
            </span>
            <span className={styles.dhLineContent}>
              {renderInlineDiff(line)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DiffHighlighter
