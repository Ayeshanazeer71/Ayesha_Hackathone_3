export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-21'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

export const token = assertValue(
  "skJU1525Wq3yqbSW7Ifcc8NI0whqcwAJCERBwHXO2dZ70ExgF7brHFA5IS1T5iKrJ40Bsiv6RiT6yQnUgkFs8MXTlhdqYlnFmqpB2jwo6kntBm7I65Lt1yW9xr1FcuTbZ9L0TAFmxHebB57EyzD2nsV6zzGanebCma3tkccUWtyoIzT4Cnrm",
  'Missing environment variable: SANITY_API_TOKEN'
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
