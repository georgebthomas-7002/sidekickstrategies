# Recommended Claude Skills for Sidekick Strategies

Based on comprehensive website research, here are 10 high-value Claude Skills prioritized by business impact.

---

## Priority 1: Critical Business Value

### 1. Brand Voice Writer
**Purpose**: Generate content that matches Sidekick Strategies' unique voice

**Specification**:
```
Skill: brand-voice-writer
Trigger: /write or /content
Input: Topic, content type, target persona
Output: On-brand content draft

Behavior:
- Apply "Empowering • Conversational • Human" voice
- Use signature phrases naturally
- Avoid corporate jargon per don'ts list
- Match persona language from PERSONAS.md
- Follow headline patterns
- Use soft CTA style
```

**Use Cases**:
- Blog post drafts
- Email sequences
- Social media content
- Website copy
- Newsletter content

**Status**: ✅ Created - `.claude/skills/brand-voice-writer/SKILL.md`

---

### 2. HubSpot Consultant Helper
**Purpose**: Assist with HubSpot-related client questions and recommendations

**Specification**:
```
Skill: hubspot-helper
Trigger: /hubspot
Input: Client question, hub context, current setup
Output: Recommendations with implementation steps

Behavior:
- Reference HubSpot best practices
- Align with Sidekick's approach (empowerment over dependency)
- Provide actionable steps, not just theory
- Consider client's HubSpot tier
- Flag when human expertise needed
```

**Use Cases**:
- Quick client answers
- Pre-meeting prep
- Solution brainstorming
- Feature recommendations
- Troubleshooting guidance

**Status**: ✅ Created - `.claude/skills/hubspot-helper/SKILL.md`

---

### 3. Proposal Generator
**Purpose**: Generate client proposals in brand voice with appropriate services

**Specification**:
```
Skill: proposal-gen
Trigger: /proposal
Input: Client info, pain points, desired outcomes, scope
Output: Formatted proposal draft

Behavior:
- Match brand voice throughout
- Include relevant services from offerings
- Reference appropriate persona pain points
- Use value-first framing
- Include pricing guidelines ($350/hr or packages)
- Suggest scope based on common patterns
```

**Use Cases**:
- New client proposals
- Scope expansions
- Training packages
- Consulting engagements

**Status**: Not yet created

---

## Priority 2: High Efficiency Gains

### 4. Client Discovery Prep
**Purpose**: Prepare for client discovery calls with targeted questions

**Specification**:
```
Skill: discovery-prep
Trigger: /discovery
Input: Company info, known context, meeting goals
Output: Discovery question set, research notes, persona match

Behavior:
- Identify likely persona from context
- Generate persona-specific discovery questions
- Flag qualifying language to listen for
- Suggest potential service matches
- Note red flags to watch for
```

**Use Cases**:
- Pre-call preparation
- Persona identification
- Qualification support

**Status**: ✅ Created - `.claude/skills/discovery-prep/SKILL.md`

---

### 5. Training Content Creator
**Purpose**: Generate HubSpot training materials and guides

**Specification**:
```
Skill: training-content
Trigger: /training
Input: Topic, audience skill level, hub focus
Output: Training outline or guide content

Behavior:
- Match teaching style (empowerment focus)
- Progressive complexity
- Include practical exercises
- Screenshot placeholders with descriptions
- Assessment questions
- Certification prep alignment
```

**Use Cases**:
- Custom training materials
- Workshop content
- Self-paced learning modules
- Team training guides

---

### 6. Email Sequence Writer
**Purpose**: Create nurture and sales email sequences

**Specification**:
```
Skill: email-sequence
Trigger: /emails
Input: Sequence goal, target persona, touchpoint count
Output: Complete email sequence with subject lines

Behavior:
- Value-first approach (give before ask)
- Progressive engagement
- Persona-appropriate language
- Soft CTAs
- No artificial urgency
- Natural conversational flow
```

**Use Cases**:
- Lead nurture sequences
- Onboarding emails
- Training follow-ups
- Re-engagement campaigns

---

## Priority 3: Content & Marketing Support

### 7. Blog Post Outliner
**Purpose**: Create structured blog outlines aligned with content pillars

**Specification**:
```
Skill: blog-outline
Trigger: /blog
Input: Topic idea, target persona, desired length
Output: Structured outline with key points

Behavior:
- Align with content pillars (HubSpot Mastery, Human-First Business, Value-First Framework, Team Empowerment)
- Include hook/opening strategy
- SEO considerations
- Internal linking opportunities
- Persona-relevant examples
```

**Use Cases**:
- Content planning
- Guest post outlines
- Thought leadership pieces
- How-to guides

---

### 8. Social Media Transformer
**Purpose**: Transform long-form content into social posts

**Specification**:
```
Skill: social-transform
Trigger: /social
Input: Source content (blog, podcast episode, etc.)
Output: Platform-specific social posts

Behavior:
- Maintain brand voice in short form
- Platform-appropriate formatting
- Pull key quotes and insights
- Include relevant hashtags
- Link back to source
```

**Use Cases**:
- Blog promotion
- Podcast episode highlights
- Quote graphics
- LinkedIn posts

---

### 9. Case Study Framework
**Purpose**: Structure client success stories

**Specification**:
```
Skill: case-study
Trigger: /case-study
Input: Client context, challenge, solution, results
Output: Formatted case study draft

Behavior:
- Human-centered storytelling
- Quantifiable results where available
- Before/after structure
- Client voice integration
- Testimonial integration
- Service connection without being salesy
```

**Use Cases**:
- Website case studies
- Proposal support materials
- Sales enablement
- Social proof content

---

### 10. Meeting Summary & Action Items
**Purpose**: Transform meeting notes into structured summaries

**Specification**:
```
Skill: meeting-summary
Trigger: /meeting
Input: Raw meeting notes or transcript
Output: Structured summary with action items

Behavior:
- Executive summary
- Key decisions made
- Action items with owners
- Open questions
- Next steps
- Client follow-up points
```

**Use Cases**:
- Client meeting follow-ups
- Internal team meetings
- Discovery call summaries
- Training session notes

---

## Implementation Priority

| Priority | Skill | Business Impact | Effort |
|----------|-------|-----------------|--------|
| 1 | Brand Voice Writer | High | Medium |
| 2 | HubSpot Consultant Helper | High | Medium |
| 3 | Proposal Generator | High | High |
| 4 | Client Discovery Prep | Medium | Low |
| 5 | Training Content Creator | Medium | Medium |
| 6 | Email Sequence Writer | Medium | Medium |
| 7 | Blog Post Outliner | Medium | Low |
| 8 | Social Media Transformer | Low | Low |
| 9 | Case Study Framework | Low | Low |
| 10 | Meeting Summary | Low | Low |

---

## Quick Wins (Implement First)
1. **Blog Post Outliner** - Low effort, immediate content value
2. **Client Discovery Prep** - Low effort, improves sales efficiency
3. **Meeting Summary** - Low effort, universal utility

## High-Impact Investments
1. **Brand Voice Writer** - Core differentiator for all content
2. **HubSpot Consultant Helper** - Scales expertise
3. **Proposal Generator** - Accelerates sales cycle

---

## Skill Development Notes

### Context Files to Reference
All skills should have access to:
- `.context/BRAND.md` - Voice and visual guidelines
- `.context/PERSONAS.md` - Target audience profiles
- `.context/TEAM.md` - Team capabilities
- `.context/RESEARCH.md` - Comprehensive company info

### Voice Calibration
Each skill should be tested against these criteria:
- Does it sound like George would say this?
- Is it conversational without being unprofessional?
- Does it avoid the "don'ts" from brand voice?
- Would a human need to heavily edit it?

### Feedback Loop
Implement a skill feedback system:
- Track which outputs get used as-is vs. edited
- Note common edits needed
- Refine skill prompts based on patterns

---

*Recommendations based on research completed January 2026*
