import type { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        disallow: ['/plumbing/', '/hvac/', '/api/', '/thank-you', '/default/'],
      },
      {
        userAgent: 'Googlebot',
        disallow: ['/plumbing/', '/hvac/', '/api/'],
      },
    ],
  }
}
