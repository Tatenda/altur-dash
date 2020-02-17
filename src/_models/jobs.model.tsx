
import slugify from 'react-slugify';

export interface IJobCreateModel {
    title: string;
    subtitle: string;
    slug: string;
    description: string;
    keywords: string[];
    company: string;
    chatbot: string;
    published: boolean;
    category: string;
    location: string;
    closing_date: string;
    email: string;
    website: string;
    organisation: string;
    user: string;
}

export class JobCreateModel {
    title: string;
    subtitle: string;
    slug: string;
    description: string;
    keywords: string[];
    company: string;
    chatbot: string;
    published: boolean;
    category: string;
    location: string;
    closing_date: string;
    email: string;
    website: string;
    organisation: string;
    user: string;

    constructor(model: IJobCreateModel) {
        this.title = model && model.title;
        this.subtitle = model && model.subtitle;
        this.slug = model && slugify(model.title);
        this.description = model && model.description;
        this.keywords = model && model.keywords;
        this.company = model && model.company;
        this.chatbot = model && model.chatbot;
        this.published = model && model.published;
        this.category = model && model.category;
        this.location = model && model.location;
        this.closing_date = model && model.closing_date;
        this.email = model && model.email;
        this.website = model && model.website;
        this.organisation = model && model.organisation;
        this.user = model && model.user;
    }
}

export interface IJobModel {
    id: string;
    title: string;
    subtitle: string;
    slug: string;
    description: string;
    keywords: string[];
    company: string;
    chatbot: string;
    published: boolean;
    category: string;
    location: string;
    closing_date: string;
    created_at: string;
    updated_at: string;
    email: string;
    website: string;
    user: string;
}