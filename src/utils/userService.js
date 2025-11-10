// LEGACY PATTERN: Using ES import for type-only imports
// NEEDS MIGRATION: Should use JSDoc @import instead
// eslint-disable-next-line no-unused-vars
import { SomeType } from './some-module';
// eslint-disable-next-line no-unused-vars
import { UserProfile } from '../types/legacyTypes';
// eslint-disable-next-line no-unused-vars
import { ComplexConfig, MixedType } from '../types/legacyTypes';

// SHOULD BECOME:
// /**
//  * @import { SomeType } from './some-module';
//  */

/**
 * Process a user profile
 * @param {UserProfile} profile - The user profile to process
 * @returns {string} Processed result
 */
export function processUserProfile(profile) {
  return `User ${profile.name} is ${profile.age} years old`;
}

/**
 * Validate configuration
 * @param {ComplexConfig} config - Configuration to validate
 * @returns {boolean} Whether config is valid
 */
export function validateConfig(config) {
  return config.user.id && config.settings.theme;
}

/**
 * Handle mixed type data
 * @param {MixedType} data - Mixed type data
 * @returns {SomeType} Transformed data
 */
export function transformData(data) {
  return {
    some: data.required,
    keys: data.optional || 0
  };
}
