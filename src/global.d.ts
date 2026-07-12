import type messages from '../messages/en.json'

declare module 'use-intl/core' {
  interface AppConfig {
    Messages: typeof messages
  }
}
