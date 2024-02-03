import type { APIRoute } from "astro";
import satori from "satori";
import { readFileSync } from "fs";
import { html } from "satori-html";
import { useEvents } from "../lib/events";
import { Resvg } from "@resvg/resvg-js";
const { nextEvent } = await useEvents();

const EMOJI_PATH = "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg"

// style="height: 100%; width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: rgb(45,26,84); font-size: 32px; font-weight: 600;"
export const GET: APIRoute = async (context) => {
    const markup = html(`
    <div
      tw="h-full w-full flex flex-row justify-between text-white text-4xl"
    >
      <div id="left" tw="flex flex-1 flex-col p-12 bg-red-800 justify-between">
        <div id="upper" tw="flex flex-col">
          <div tw="text-6xl mt-8 flex flex-col text-white">
            <div tw="text-5xl">Aalborg</div>
            <div tw="text-8xl">Hackathon</div>
          </div>
        </div>
        <div id="lower" tw="flex flex-col">
          <div id="title" tw="flex flex-row">
          🏢 <span tw="ml-6">${nextEvent?.data.title}</span>
          </div>
          <div id="location" tw="flex flex-row">
          📍 <span tw="ml-6">${nextEvent?.data.location}</span>
          </div>
          <div id="date" tw="flex flex-row">
          🗓️ <span tw="ml-6">${nextEvent?.data.date.toLocaleDateString("da")}</span>
          </div>
          <div tw="flex flex-row" id="time">
          🕘️ <span tw="flex ml-6">09:00</span>
          </div>
          <div style="font-family: Material Icons;" tw="flex flex-col">
          &#xf1c3; asdfas &#xe766; &#xeb9b; &#xf089; &#9200
          </div>
        </div>
      </div>
      <div id="right" tw="flex-1 flex flex-col">
        <img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Aalborg_NyTorv_2004_ubt.jpeg" tw="h-full" />
      </div>
    </div>
    `);
    
    const baseFontFile = readFileSync("./public/fonts/Optimistic_Display_Bold.ttf");
    const iconFontFile = readFileSync("./public/fonts/material.woff")
  
    // resulting svg is basically a long string
    const svg: string = await satori(markup, {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Optimistic Display",
          data: baseFontFile,
          style: "normal",
        },
        {
          name: "Material Icons",
          data: iconFontFile,
          style: "normal",
          weight: 400
        }

      ],
      graphemeImages: {
        '🗓️': twemoji('1f5d3'),
        '🕘️': twemoji('1f558'),
        '📍': twemoji('1f4cd'),
        '🏢': twemoji('1f3e2')
      },
    });

    /*
    return new Response(svg, {
      status: 200,
      headers: {
        "Content-Type": "image/svg+xml"
      }
    })
    */
    

    const resvg = new Resvg(svg, {
      font: {
        fontDirs: [`${process.cwd()}/public/fonts`],
        loadSystemFonts: false
      },
    });

    const pngData = resvg.render();
    const pngBuffer = pngData.asPng()

    console.info('Original SVG Size:', `${resvg.width} x ${resvg.height}`)
    console.info('Output PNG Size  :', `${pngData.width} x ${pngData.height}`)
  
    return new Response(pngBuffer, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
      },
    });
}

function twemoji(id: string) {
  return `${EMOJI_PATH}/${id}.svg`
}