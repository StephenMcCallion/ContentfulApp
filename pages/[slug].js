const contentful = require('contentful')

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN
})

export default function ProductPage(props) {
    if(props.error) {
        return (
            <div>
                <h2>An error occured:</h2>
                <h3>{props.error}</h3>
            </div>
        )
    }

    return <ul>
        <li>{props.blogid}</li>
        <li>{props.blogheading}</li>
        <li>{props.blogContent}</li>
        <li>{props.blogMedia}</li>
        <li>{props.blogDate}</li>
    </ul>
}

export async function getServerSideProps(context) {
    console.log("context: ", context.params)
    const entries = await client.getEntries({
        content_type: 'blog',
        limit: 1,
        "fields.blogid": context.params.slug,
    })

    console.log("Products: ", entries)

    return {
        props: {
            error: !entries.items.length && `No product with id: ${context.params.slug}`,
            ...entries?.items?.[0]?.fields
        },
    }
}