import parse from "html-react-parser";
import styles from "./PolicyContent.module.scss";

export default function PolicyContent({ content }: { content: string }) {
    // Content is static policy copy maintained in pageSchemas, never user input.
    return <article className={styles.policyContent}>{parse(content)}</article>;
}
