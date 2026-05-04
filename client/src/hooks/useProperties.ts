/**
 * useProperties.ts
 * Načítá nemovitosti z Markdown souborů ve složce src/content/nemovitosti/
 * Každý soubor má YAML frontmatter s daty nemovitosti.
 * Používá Vite's import.meta.glob pro statický import při buildu.
 */

import { useMemo } from "react";

// Vite glob import – načte všechny .md soubory jako raw string
const markdownFiles = import.meta.glob("../../../src/content/nemovitosti/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

export interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  type: string;
  status: string;
  rooms: number;
  area: number;
  image: string;
  gallery: string[];        // pole URL dalších fotografií
  badge: string | null;
  description: string;      // krátký popis (pro kartu)
  fullDescription: string;  // podrobný popis (pro detail stránku)
  features: string[];       // seznam vybavení / vlastností
  agent: string;
  agentPhone: string;
  order: number;
}

/**
 * Jednoduchý parser YAML frontmatter bez externích závislostí.
 * Parsuje blok mezi --- a --- na začátku souboru.
 * Podporuje skalární hodnoty, víceřádkové seznamy (- položka) a inline seznamy ([a, b]).
 */
function parseFrontmatter(raw: string): Record<string, unknown> {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};

  const yaml = match[1];
  const result: Record<string, unknown> = {};
  const lines = yaml.split(/\r?\n/);
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) { i++; continue; }

    const key = line.slice(0, colonIdx).trim();
    const rest = line.slice(colonIdx + 1).trim();

    // Inline list: key: [a, b, c]
    if (rest.startsWith("[") && rest.endsWith("]")) {
      const items = rest.slice(1, -1).split(",").map((s) => s.trim().replace(/^["']|["']$/g, ""));
      result[key] = items;
      i++;
      continue;
    }

    // Block list: next lines start with "  - "
    if (rest === "") {
      const listItems: string[] = [];
      i++;
      while (i < lines.length && lines[i].trimStart().startsWith("- ")) {
        listItems.push(lines[i].trimStart().slice(2).trim().replace(/^["']|["']$/g, ""));
        i++;
      }
      if (listItems.length > 0) {
        result[key] = listItems;
        continue;
      }
      result[key] = null;
      continue;
    }

    // Scalar value
    let value: string | number | null = rest;
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (value === "" || value === "null" || value === "~") {
      result[key] = null;
    } else if (/^\d+$/.test(value)) {
      result[key] = parseInt(value, 10);
    } else {
      result[key] = value;
    }
    i++;
  }

  return result;
}

/**
 * Extrahuje tělo Markdown souboru (za druhým ---)
 */
function parseBody(raw: string): string {
  const match = raw.match(/^---[\s\S]*?---\r?\n([\s\S]*)$/);
  return match ? match[1].trim() : "";
}

const AGENT_PHONES: Record<string, string> = {
  "Ing. Vít Hovjadský": "+420 603 442 763",
  "Ing. Petra Koudelková": "+420 704 361 302",
};

export function useProperties(): Property[] {
  return useMemo(() => {
    const entries = Object.entries(markdownFiles);
    if (entries.length === 0) return [];

    const properties: Property[] = entries.map(([path, raw]) => {
      const fm = parseFrontmatter(raw);
      const body = parseBody(raw);
      const slug = path.split("/").pop()?.replace(/\.md$/, "") ?? path;
      const agent = String(fm.agent ?? "Ing. Vít Hovjadský");

      // Galerie
      const gallery = Array.isArray(fm.gallery)
        ? (fm.gallery as string[]).filter(Boolean)
        : [];

      // Vybavení / vlastnosti
      const features = Array.isArray(fm.features)
        ? (fm.features as string[]).filter(Boolean)
        : [];

      return {
        id: slug,
        title: String(fm.title ?? "Nemovitost"),
        location: String(fm.location ?? ""),
        price: String(fm.price ?? ""),
        type: String(fm.type ?? "Domy"),
        status: String(fm.status ?? "Prodej"),
        rooms: Number(fm.rooms ?? 0),
        area: Number(fm.area ?? 0),
        image: fm.image ? String(fm.image) : "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop",
        gallery,
        badge: fm.badge ? String(fm.badge) : null,
        description: String(fm.description ?? ""),
        fullDescription: body || String(fm.description ?? ""),
        features,
        agent,
        agentPhone: AGENT_PHONES[agent] ?? "+420 603 442 763",
        order: Number(fm.order ?? 99),
      };
    });

    return properties.sort((a, b) => a.order - b.order);
  }, []);
}

export function useProperty(id: string): Property | undefined {
  const all = useProperties();
  return all.find((p) => p.id === id);
}
