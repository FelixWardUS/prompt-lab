# Prompt Patterns

Prompt Lab is built around small, reusable prompt patterns. Each generated prompt combines a few of these patterns instead of relying on a single generic template.

## Role Framing

Role framing gives the model a clear job.

Example:

```text
Role: You are a precise meeting summarizer who extracts decisions, action items, and open questions.
```

## Structured Output

Structured output reduces vague responses by naming the exact sections expected.

Example:

```text
Output Format:
- Brief Summary
- Decisions
- Action Items
- Open Questions
```

## Constraint Setting

Constraints tell the model what it must avoid, preserve, or ask about.

Example:

```text
Constraints:
- Use only information from the source text.
- Separate confirmed facts from open questions.
- Ask one concise clarifying question if required information is missing.
```

## Source Grounding

Source grounding is useful for summarization, extraction, and RAG-style prompts. It keeps the answer tied to the provided source text instead of asking the model to rely on outside knowledge.

## Safety Boundaries

Safety boundaries are important for support and policy prompts. They prevent the assistant from promising refunds, approvals, timelines, or outcomes that are not stated in the provided context.

## Verification Loop

Verification loops are useful for developer and planning prompts. They ask the model to include assumptions, risks, and concrete verification steps.
