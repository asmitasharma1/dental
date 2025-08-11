export interface NavbarProps {
    isHomePage?: boolean
  }
  
  export interface Service {
    id: number
    title: string
    description: string
    category: string
    price: number
    duration: string
    image_url: string
    is_active: boolean
  }
  
  export interface Blog {
    id: number
    title: string
    content: string
    excerpt: string
    author: string
    image_url: string
    published_date: string
    is_published: boolean
    created_at: string
    updated_at: string
  }
  
  export interface Doctor {
    id: number
    name: string
    position: string
    degree: string
    nmc_number: string
    linkedin_url: string
    image_url: string
    specialties: string[]
    is_active: number
    created_at: string
    updated_at: string
  }
  