/**
 * Servicio para gestionar posts del blog desde Supabase
 */

import { supabase } from "@/shared/lib/supabase";
import type {
  BlogPost,
  BlogPostPreview,
  BlogFilters,
} from "@/shared/types/blog";

export class BlogService {
  /**
   * Obtiene todos los posts publicados (con filtros opcionales)
   */
  static async getPosts(filters?: BlogFilters): Promise<BlogPostPreview[]> {
    try {
      let query = supabase
        .from("blog_posts")
        .select(
          "id, title, slug, excerpt, image_url, author, category, read_time, published_at"
        )
        .eq("published", true)
        .order("published_at", { ascending: false });

      // Aplicar filtros
      if (filters?.language) {
        query = query.eq("language", filters.language);
      }

      if (filters?.category) {
        query = query.eq("category", filters.category);
      }

      if (filters?.tag) {
        query = query.contains("tags", [filters.tag]);
      }

      if (filters?.search) {
        query = query.or(
          `title.ilike.%${filters.search}%,excerpt.ilike.%${filters.search}%,content.ilike.%${filters.search}%`
        );
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching blog posts:", error);
        return [];
      }

      return (data as BlogPostPreview[]) || [];
    } catch (error) {
      console.error("Error in getPosts:", error);
      return [];
    }
  }

  /**
   * Obtiene un post por su slug
   */
  static async getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .single();

      if (error) {
        console.error("Error fetching blog post:", error);
        return null;
      }

      return data as BlogPost;
    } catch (error) {
      console.error("Error in getPostBySlug:", error);
      return null;
    }
  }

  /**
   * Obtiene posts relacionados (misma categoría)
   */
  static async getRelatedPosts(
    currentSlug: string,
    category: string,
    limit = 3
  ): Promise<BlogPostPreview[]> {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select(
          "id, title, slug, excerpt, image_url, author, category, read_time, published_at"
        )
        .eq("published", true)
        .eq("category", category)
        .neq("slug", currentSlug)
        .order("published_at", { ascending: false })
        .limit(limit);

      if (error) {
        console.error("Error fetching related posts:", error);
        return [];
      }

      return (data as BlogPostPreview[]) || [];
    } catch (error) {
      console.error("Error in getRelatedPosts:", error);
      return [];
    }
  }

  /**
   * Obtiene todas las categorías únicas
   */
  static async getCategories(): Promise<string[]> {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("category")
        .eq("published", true);

      if (error) {
        console.error("Error fetching categories:", error);
        return [];
      }

      const uniqueCategories = new Set(data.map((post) => post.category));
      return Array.from(uniqueCategories);
    } catch (error) {
      console.error("Error in getCategories:", error);
      return [];
    }
  }

  /**
   * Obtiene todos los tags únicos
   */
  static async getTags(): Promise<string[]> {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("tags")
        .eq("published", true);

      if (error) {
        console.error("Error fetching tags:", error);
        return [];
      }

      const allTags = data.flatMap((post) => post.tags || []);
      const uniqueTagsSet = new Set(allTags);
      return Array.from(uniqueTagsSet);
    } catch (error) {
      console.error("Error in getTags:", error);
      return [];
    }
  }
}
