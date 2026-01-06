import {person} from './documents/person'
import {page} from './documents/page'
import {post} from './documents/post'
import {podcast} from './documents/podcast'
import {download} from './documents/download'
import {stylePreset} from './documents/stylePreset'
// Portal schemas
import {portalSession} from './documents/portalSession'
import {portalClient} from './documents/portalClient'
import {callToAction} from './objects/callToAction'
import {infoSection} from './objects/infoSection'
import {settings} from './singletons/settings'
import {link} from './objects/link'
import {blockContent} from './objects/blockContent'
import button from './objects/button'
import {blockContentTextOnly} from './objects/blockContentTextOnly'
import {sectionSettings} from './objects/sectionSettings'
// Page builder blocks
import {hero} from './objects/hero'
import {featuredArticles} from './objects/featuredArticles'
import {featuredPodcasts} from './objects/featuredPodcasts'
import {downloadsGrid} from './objects/downloadsGrid'
import {testimonial} from './objects/testimonial'
import {teamGrid} from './objects/teamGrid'
import {contactForm} from './objects/contactForm'
import {faqAccordion} from './objects/faqAccordion'
import {servicesGrid} from './objects/servicesGrid'
import {seo} from './objects/seo'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types

export const schemaTypes = [
  // Singletons
  settings,
  // Documents
  page,
  post,
  podcast,
  download,
  person,
  stylePreset,
  // Portal documents
  portalSession,
  portalClient,
  // Objects
  button,
  blockContent,
  blockContentTextOnly,
  infoSection,
  callToAction,
  link,
  sectionSettings,
  // Page builder blocks
  hero,
  featuredArticles,
  featuredPodcasts,
  downloadsGrid,
  testimonial,
  teamGrid,
  contactForm,
  faqAccordion,
  servicesGrid,
  // SEO
  seo,
]
