'use client'

import { Fragment, useState } from "react";

interface ChangelogEntry {
  name: string;
  version?: string,
  date?: string;
  changes: string[];
}


const CURRENT_DATE = new Date();

const CHANGELOG_ENTRIES: ChangelogEntry[] = [

  // {
  //   name: "At some point",
  //   date: "March 20, 2025",
  //   changes: [
  //     `The future of coding is hard to predict, but we think there are three aspects that will remain the same regardless of model intelligence.`,
  //     `1. People will use AI to locate code`,
  //     `2. People will use AI to edit code`,
  //     `3. People will valide the changes that AI makes.`,
  //     `People only care about 1. what the state of the program is, 2. where the state is used, 3. and where it changes. Allow AI to trace through all three of these. Eg. data structure X created here, it is passed in here, it changes here, it is passed in again here, it is set here, etc. Do this for the full top-to-bottom trace.`,
  //     `Allow AI to trace through deeply nested function calls and summarize what is happening.`,
  //     `Current tools like Copilot and Cursor help with editing code, but (largely) not locating it or validating it. Here are some ideas on solving this`,
  //     `AI traces Finetune models to group code by feature, eg. "Here is the code for authentication". One can imagine breaking any program into fewer than ~100 features that any human can understand.`,
  //     `Allow AI to write test cases and iterate until all of them pass.`,
  //     `One can generalize this to an AI that can iterate on higher-level test cases, like "create a good looking website".`,
  //     `(this is the feature idea, but used to describe changes) As AI makes larger code changes, humans will need more efficient ways to understand those changes. One idea is to group all changes into high level categories like "auth changes" or "state changes", and map each category back to the sourcecode.`,
  //   ]
  // },


  {
    name: "Beta Patch #1",
    version: 'v1.0.1',
    date: "January 23, 2025",
    changes: [
      "New default theme.",
      "Add support for DeepSeek.",
      "Fixed system prompt errors when using o1 and Gemini.",
      "Improved prompts for fast-apply and quick edit.",
      "Performance improvements for chat.",
      "Temporarily disable autocomplete (needs better model selection guardrails).",
      "Minor updates to diff streaming algorithm and FIM output parsing algorithm.",
    ]
  },

  {
    name: "Beta Release",
    version: 'v1.0.0',
    date: "January 19, 2025",
    changes: [
      "Added quick edits (Ctrl+K)! This includes FIM-prompting, output parsing, and history management.",
      "Added autocomplete!",
      "Void now lives natively in the VSCode codebase, no more extension API.",
      "Added new UI to smoothly show the LLM's streamed changes in VSCode.",
      "New settings page with one-click switch, model selection, and even more providers.",
      "Added auto-detection of Ollama models by default.",
      "Fixed CORS and CSP errors for many local models by originating LLM calls from 'node/' with IPC.",
      "Native UI for Accept/Reject buttons, streaming, and interruptions.",
      "File suggestions in the chat based on history.",
      "Switched from the MIT License to the Apache 2.0 License for a little more protection on our OSS initiative.",
    ]
  },

  {
    name: "Early Launch",
    date: "October 1, 2024",
    changes: [
      "Initialized Void's website and GitHub repo.",
      "A lot of early setup work not recorded in this changelog.",
      "Basic features like LLM streaming in the editor, custom history, custom editor UI.",
      "Users could build Void for an early version of Ctrl+L and fast-apply.",
    ]
  }
];

const isFutureDate = (dateStr?: string) => {
  if (!dateStr) return false;
  const date = new Date(dateStr);
  // Set both dates to start of day for accurate comparison
  const compareDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const currentDate = new Date(CURRENT_DATE.getFullYear(), CURRENT_DATE.getMonth(), CURRENT_DATE.getDate());
  return compareDate > currentDate;
};


const ChangelogEntry = ({ name, date, version, changes }: ChangelogEntry) => {
  return (
    <div className={`md:grid md:grid-cols-[170px_1fr] gap-4 md:gap-8 transition-all duration-300`}>
      <div className="text-gray-500 md:text-right md:pr-8 pt-0.5 md:border-r border-gray-200 mb-2 md:mb-0">
        {date}
      </div>
      <div className="relative">
        <div className="flex flex-col gap-2 mb-4">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold">{name}</h2>
          </div>
          <div className="text-gray-500 text-sm ">
            {version}
          </div>
        </div>

        <ul className="space-y-3 text-gray-600 text-sm">
          {changes.map((change, index) => {
            return (<li key={index} className={`list-disc list-outside ml-5 break-words`}>
              {change}
            </li>);
          })}
        </ul>
      </div>
    </div>
  );
};

const Changelog = () => {

  const changes = CHANGELOG_ENTRIES.map((entry, i) => (
    <Fragment key={i}>
      <ChangelogEntry
        {...entry}
      />
    </Fragment>
  ))

  return (
    <div className="min-h-screen ">
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-20 pb-32">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Changelog</h1>
        <p className="text-lg md:text-lg text-gray-600 mb-8">All major updates and releases.</p>
        <div className="space-y-16">
          {changes}
        </div>
      </div>
    </div>
  );
}

export default Changelog