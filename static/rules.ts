export const rules = {
    url: {
        route: {
            rules: [
                {
                    name: 'isLowerCase',
                    rule: 'Urls should be in lowercase and uppercase variants of url 301 redirected to lowercase',                    
                },
                {
                    name: 'isValidRoute',
                    rule: 'Should not be able to put incorrect text at end of url and it renders, should 301 redirect to right url.'
                },
                {
                    name: 'is2xx',
                    rule: 'The route must return a status code of 2xx'
                }
            ]
        }
    },
    meta: {
        title: {
           rules: [
               {
                   name: 'oneMeta',
                   rule: 'Only one unique title tag on the page'
               },
               {
                   name: 'isSSRDelivered',
                   rule: 'to be SSR, not delivered CSR (i.e. video)'
               }
           ] 
        },
        description: {
            rules: [
                {
                    name: 'oneDescription',
                    rule: 'only one Meta Description tag on the page'                    
                }
            ]
        },
        canonical: {
            rules: [
                {
                    name: 'oneCanonical',
                    rule: 'Only one canonical url on the page'
                },
                {
                    name: 'sameAsBaseRoute',
                    rule: 'exactly the same as URL i.e. self referencing'
                },
                {
                    name: 'fullPath',
                    rule: 'full url, not relative'
                }
            ]
        },
        amp: {
            rules: [
                {
                    name: 'oneAmpUrl',
                    rule: 'only one amphtml tag on the page'
                },
                {
                    name: 'validPath',
                    rule: 'the url and return 200 status'
                },
                {
                    name: 'ampUrlCanonicalsToOriginalRoute',
                    rule: 'The AMP url should have a canonical back to original url'
                }
            ]
        },
        robots: {
            rules: [
                {
                    name: 'oneRobots',
                    rule: 'only one robots tag on the page'
                },
                {
                    name: 'containsNoodp',
                    rule: 'Robots tag must contain "noodp"'
                },
                {
                    name: 'doesNotContainNoFollow',
                    rule: 'Robots tag must not include "nofollow"'
                },
                {
                    name: 'doesNotContainNoIndex',
                    rule: 'Robots tag must not include "noindex"'
                }
            ]
        },
        schema: {
            rules: [
                {
                    name: 'newsArticleIsPresent',
                    rule: 'NewsArticle type is present within schema'
                },
                {
                    name: 'mainEntityOfPageIsBaseUrl',
                    rule: 'Mainentityofpage attribute must match the base url'
                },
                {
                    name: 'headLineisSameAsH1',
                    rule: 'Headline attribute must match the h1 of the page'
                },
                {
                    name: 'datePublished',
                    rule: 'has to be before date modified in UTC format If ‘publish’ on page then this date/time stamp has to be same as .  This is the date in the *news* xml sitemap'
                },
                 {
                     name: 'dateModified',
                     rule: 'has to be after or equal to date published in UTC format if ‘update on page then this date / time stamp has to be same as.  This is the date in the xml sitemap for *articles*.'
                 },
                 {
                     name: 'organisationSchema',
                     rule: 'specify the organisation name'
                 },
                 {
                     name: 'image',
                     rule: 'Image - has to be exactly the same (URL) image as one shown on the page - ideally first image, note cannot be a different ‘version/size’ of the same image'
                 }
            ]
        },
        body: {
            rules: [
                {
                    name: 'onlyOneH1',
                    rule: 'should only be one H1 on the page'
                },
                {
                    name: 'date',
                    rule: 'date must match same day/time as datemodified tag in schema & identified on the page that this is ‘updated’ day/time'
                },
                {
                    name: 'date2',
                    rule: 'same day/time as datepublished tag in schema & identified on the page that this is the ‘published’ day/time'
                }
            ]
        },
        images: {
            rules: [
                {
                    name: 'headerImageIsListedWithinSchemaAsPrimaryImage',
                    rule: 'The top image or image within video should be the primary image for the page with is referenced in schema.'
                },
                {
                    name: 'optimizedImage',
                    rule: 'all images to be optimized image sizing, no scaling'
                }
            ]
        },
        links: {
            rules: [
                {
                    name: 'linksAre200',
                    rule: 'all links to go to 200 status pages'
                }
            ]
        }
    }
}