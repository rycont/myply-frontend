import { Client } from "@notionhq/client"
import { ListBlockChildrenResponse, QueryDatabaseParameters, CreatePageParameters } from "@notionhq/client/build/src/api-endpoints"

export const notion = new Client({
    auth: process.env.NOTION_API || (() => { throw new Error("Cannot get Notion API env") })(),
})

interface DatabaseConnectionInfo {
    name: string
    id: string
}

let cachedPage: ListBlockChildrenResponse
let cachedDatabases: DatabaseConnectionInfo[]

const getPage = async () => {
    if (cachedPage) return cachedPage
    cachedPage = await notion.blocks.children.list({
        block_id: "376780c7-7f5c-4483-a740-de82d69036d2",
    })
    return cachedPage
}

export const fetchDatabases = async () => {
    if (cachedDatabases) return cachedDatabases
    const page = await getPage();
    cachedDatabases = page.results.map(e => ({
        name: (e as { child_database: { title: string } }).child_database.title,
        id: e.id
    }))
    return cachedDatabases
}

export interface Relation {
    scheme: string
    id: string[]
}

const adf: CreatePageParameters['properties'] = {
    aasdfasdf: {
        rich_text: [{
            text: {
                content: "Good"
            }
        }]
    }
}

type TypeBase = Record<string, string | number | boolean | Relation>

const object2NotionProperty = (content: TypeBase) => {
    return Object.fromEntries(Object.entries(content).map(([key, value]) => {
        const type = typeof value
        if (key === 'title') throw new Error("Conflicted column name : 'title'")
        if (type === 'boolean') return [key, {
            checkbox: value
        }]
        if (type === 'string') return [key, {
            rich_text: [{
                text: {
                    content: value
                }
            }]
        }]
        if (type === 'number') return [key, value]
        if (type === 'object') return [key, {
            relation: (value as Relation).id.map(id => ({
                id
            }))
        }]
    }) as [string, string | number | {
        checkbox: boolean
    } | {
        relation: { id: string }[]
    }][])
}

const property2object = (content: CreatePageParameters['properties']) => {
    return Object.fromEntries(Object.entries(content).map(([key, value]: [string, {
        id: string;
        type: string;
    } & Record<string, any>]) => {
        if (value.type === 'rich_text') return [key, value.rich_text.map((t: { plain_text: string }) => t.plain_text).join('')]
        if (value.type === 'title') return [key, value.title.map((t: { plain_text: string }) => t.plain_text).join('')]
        if (value.type === 'relation') return [key, value.relation.map((e: { id: string }) => e.id)]
        return [key, value[value.type]]
    }))
}

class Database<DocumentType extends TypeBase> {
    id: string
    constructor(id: string) {
        this.id = id
    }

    async get(query: Omit<QueryDatabaseParameters, "database_id">) {
        const res = await notion.databases.query({
            ...query,
            database_id: this.id,
        })
        return res.results.map(e => ({
            ...property2object((e as { properties: CreatePageParameters['properties'] }).properties),
            _id: e.id
        }))
    }

    async create(content: DocumentType) {
        //@ts-ignore
        const res = await notion.pages.create({
            parent: {
                database_id: this.id,
            },
            properties: object2NotionProperty(content)
        });
        return res.id
    }
}

export const connectDatabase = async <Type extends TypeBase>(name: string) => {
    const databases = await fetchDatabases()
    const targetDatabaseId = databases.find(e => e.name === name)?.id
    if (!targetDatabaseId) throw new Error(`Cannot find database: "${name}"`)

    return new Database<Type>(targetDatabaseId)
}
