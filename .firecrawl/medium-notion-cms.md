[Sitemap](https://ppaanngggg.medium.com/sitemap/sitemap.xml)

[Open in app](https://play.google.com/store/apps/details?id=com.medium.reader&referrer=utm_source%3DmobileNavBar&source=post_page---top_nav_layout_nav-----------------------------------------)

Sign up

[Sign in](https://medium.com/m/signin?operation=login&redirect=https%3A%2F%2Fppaanngggg.medium.com%2Fnotion-as-a-headless-cms-for-next-js-15-in-2025-f08207280e67&source=post_page---top_nav_layout_nav-----------------------global_nav------------------)

[Medium Logo](https://medium.com/?source=post_page---top_nav_layout_nav-----------------------------------------)

Get app

[Write](https://medium.com/m/signin?operation=register&redirect=https%3A%2F%2Fmedium.com%2Fnew-story&source=---top_nav_layout_nav-----------------------new_post_topnav------------------)

[Search](https://medium.com/search?source=post_page---top_nav_layout_nav-----------------------------------------)

Sign up

[Sign in](https://medium.com/m/signin?operation=login&redirect=https%3A%2F%2Fppaanngggg.medium.com%2Fnotion-as-a-headless-cms-for-next-js-15-in-2025-f08207280e67&source=post_page---top_nav_layout_nav-----------------------global_nav------------------)

![](https://miro.medium.com/v2/resize:fill:32:32/1*dmbNkD5D-u45r44go_cf0g.png)

Member-only story

# Notion as a Headless CMS for Next.js 15 in 2025

[![ppaanngggg](https://miro.medium.com/v2/resize:fill:32:32/1*IfhciZFEiCaUWotDg3g5Qw.jpeg)](https://ppaanngggg.medium.com/?source=post_page---byline--f08207280e67---------------------------------------)

[ppaanngggg](https://ppaanngggg.medium.com/?source=post_page---byline--f08207280e67---------------------------------------)

Follow

5 min read

·

Oct 10, 2025

[Listen](https://medium.com/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2Fplans%3Fdimension%3Dpost_audio_button%26postId%3Df08207280e67&operation=register&redirect=https%3A%2F%2Fppaanngggg.medium.com%2Fnotion-as-a-headless-cms-for-next-js-15-in-2025-f08207280e67&source=---header_actions--f08207280e67---------------------post_audio_button------------------)

Share

Press enter or click to view image in full size

![Use Notion as CMS for Next.js](https://miro.medium.com/v2/resize:fit:700/1*PpeslST99FqmLTyP8BctCA.png)

Made by [design0.ai](https://design0.ai/)

## Introduction

I want to use Notion as a content management system (CMS) for my websites built with Next.js 15 using the App Router. When I initially searched on GitHub, I only found two main solutions: [react-notion](https://github.com/splitbee/react-notion) and its successor [react-notion-x](https://github.com/NotionX/react-notion-x). Unfortunately, I couldn’t successfully configure either of these in my project.

After further research, I discovered a much better approach by combining two different libraries: [notion-to-md](https://github.com/souvikinator/notion-to-md) and [markdown-to-jsx](https://github.com/quantizor/markdown-to-jsx). This combination allowed me to build a lightweight and easy-to-configure CMS solution for Next.js 15 apps.

This approach works by first converting Notion content to Markdown format using notion-to-md, then rendering that Markdown as React components using markdown-to-jsx. I believe this is the most effective solution for using Notion as a CMS with Next.js in 2025.

## Why Notion?

Notion offers key advantages as a CMS for Next.js projects: it’s already part of my content workflow, making it a natural CMS choice; its familiar interface eliminates learning curves; built-in collaboration simplifies team editing; it creates a direct content pipeline to my website; and rich text editing and AI assistance improve content quality.

Using Notion as my CMS maintains a single source of truth, eliminating reformatting between platforms. This streamlines publishing and lets me focus on creating quality content instead of technical details.

## Why Next.js?

I chose Next.js for its accessibility to non-frontend experts and solid React foundation. Its popularity ensures abundant documentation and community support when problems arise.

The framework’s server-side rendering improves both performance and SEO for content-heavy sites, making it perfect for a Notion-based CMS. This pairing lets me deploy robust websites efficiently without frontend complexity.

## Step by Step to Set Up Notion as a Headless CMS for Next.js 15

## 1\. Set Up Notion Integration

First, you need to create a Notion integration to access your content programmatically:

## Create an account to read the full story.

The author made this story available to Medium members only.

If you’re new to Medium, create a new account to read this story on us.

[Continue in app](https://play.google.com/store/apps/details?id=com.medium.reader&referrer=utm_source%3Dregwall&source=-----f08207280e67---------------------post_regwall------------------)

Or, continue in mobile web

[Sign up with Google](https://medium.com/m/connect/google?state=google-%7Chttps%3A%2F%2Fppaanngggg.medium.com%2Fnotion-as-a-headless-cms-for-next-js-15-in-2025-f08207280e67%3Fsource%3D-----f08207280e67---------------------post_regwall------------------%26skipOnboarding%3D1%7Cregister%7Cremember_me&source=-----f08207280e67---------------------post_regwall------------------)

[Sign up with Facebook](https://medium.com/m/connect/facebook?state=facebook-%7Chttps%3A%2F%2Fppaanngggg.medium.com%2Fnotion-as-a-headless-cms-for-next-js-15-in-2025-f08207280e67%3Fsource%3D-----f08207280e67---------------------post_regwall------------------%26skipOnboarding%3D1%7Cregister%7Cremember_me&source=-----f08207280e67---------------------post_regwall------------------)

Sign up with email

Already have an account? [Sign in](https://medium.com/m/signin?operation=login&redirect=https%3A%2F%2Fppaanngggg.medium.com%2Fnotion-as-a-headless-cms-for-next-js-15-in-2025-f08207280e67&source=-----f08207280e67---------------------post_regwall------------------)

[![ppaanngggg](https://miro.medium.com/v2/resize:fill:48:48/1*IfhciZFEiCaUWotDg3g5Qw.jpeg)](https://ppaanngggg.medium.com/?source=post_page---post_author_info--f08207280e67---------------------------------------)

[![ppaanngggg](https://miro.medium.com/v2/resize:fill:64:64/1*IfhciZFEiCaUWotDg3g5Qw.jpeg)](https://ppaanngggg.medium.com/?source=post_page---post_author_info--f08207280e67---------------------------------------)

Follow

[**Written by ppaanngggg**](https://ppaanngggg.medium.com/?source=post_page---post_author_info--f08207280e67---------------------------------------)

[29 followers](https://ppaanngggg.medium.com/followers?source=post_page---post_author_info--f08207280e67---------------------------------------)

· [18 following](https://ppaanngggg.medium.com/following?source=post_page---post_author_info--f08207280e67---------------------------------------)

I am a full-stack developer interested in investment and machine learning. I'd like to open source user-friendly application.

Follow

## No responses yet

![](https://miro.medium.com/v2/resize:fill:32:32/1*dmbNkD5D-u45r44go_cf0g.png)

Write a response

[What are your thoughts?](https://medium.com/m/signin?operation=register&redirect=https%3A%2F%2Fppaanngggg.medium.com%2Fnotion-as-a-headless-cms-for-next-js-15-in-2025-f08207280e67&source=---post_responses--f08207280e67---------------------respond_sidebar------------------)

Cancel

Respond

## More from ppaanngggg

![How to analyze document layout by YOLO](https://miro.medium.com/v2/resize:fit:679/format:webp/1*D99q35z7qd7PB_OflQTp0g.png)

[![ppaanngggg](https://miro.medium.com/v2/resize:fill:20:20/1*IfhciZFEiCaUWotDg3g5Qw.jpeg)](https://ppaanngggg.medium.com/?source=post_page---author_recirc--f08207280e67----0---------------------4bbbafb6_d5b3_4382_bb77_eb7e963143d3--------------)

[ppaanngggg](https://ppaanngggg.medium.com/?source=post_page---author_recirc--f08207280e67----0---------------------4bbbafb6_d5b3_4382_bb77_eb7e963143d3--------------)

[**How to analyze document layout by YOLO**\\
\\
**Learn how to analyze document layout using YOLO and DocLayNet, with detailed steps, live demo, and performance benchmarks.**](https://ppaanngggg.medium.com/how-to-analyze-document-layout-c1f7572b4e18?source=post_page---author_recirc--f08207280e67----0---------------------4bbbafb6_d5b3_4382_bb77_eb7e963143d3--------------)

Jun 11, 2024

[A clap icon8](https://ppaanngggg.medium.com/how-to-analyze-document-layout-c1f7572b4e18?source=post_page---author_recirc--f08207280e67----0---------------------4bbbafb6_d5b3_4382_bb77_eb7e963143d3--------------)

![YOLOv11: A New Breakthrough in Document Layout Analysis](https://miro.medium.com/v2/resize:fit:679/format:webp/1*p4V5hGKyoXGInx6C0o8LoQ.png)

[![ppaanngggg](https://miro.medium.com/v2/resize:fill:20:20/1*IfhciZFEiCaUWotDg3g5Qw.jpeg)](https://ppaanngggg.medium.com/?source=post_page---author_recirc--f08207280e67----1---------------------4bbbafb6_d5b3_4382_bb77_eb7e963143d3--------------)

[ppaanngggg](https://ppaanngggg.medium.com/?source=post_page---author_recirc--f08207280e67----1---------------------4bbbafb6_d5b3_4382_bb77_eb7e963143d3--------------)

[**YOLOv11: A New Breakthrough in Document Layout Analysis**\\
\\
**Explore the latest advancements in document layout analysis with YOLOv11**](https://ppaanngggg.medium.com/yolov11-a-new-breakthrough-in-document-layout-analysis-a0a292d9483e?source=post_page---author_recirc--f08207280e67----1---------------------4bbbafb6_d5b3_4382_bb77_eb7e963143d3--------------)

Oct 30, 2024

[A clap icon6\\
\\
A response icon1](https://ppaanngggg.medium.com/yolov11-a-new-breakthrough-in-document-layout-analysis-a0a292d9483e?source=post_page---author_recirc--f08207280e67----1---------------------4bbbafb6_d5b3_4382_bb77_eb7e963143d3--------------)

![comparative performance metrics](https://miro.medium.com/v2/resize:fit:679/format:webp/1*mKb4u-P-OuhS1GbllLstRw.png)

[![ppaanngggg](https://miro.medium.com/v2/resize:fill:20:20/1*IfhciZFEiCaUWotDg3g5Qw.jpeg)](https://ppaanngggg.medium.com/?source=post_page---author_recirc--f08207280e67----2---------------------4bbbafb6_d5b3_4382_bb77_eb7e963143d3--------------)

[ppaanngggg](https://ppaanngggg.medium.com/?source=post_page---author_recirc--f08207280e67----2---------------------4bbbafb6_d5b3_4382_bb77_eb7e963143d3--------------)

[**YOLOv12: The Next Evolution in Document Layout Analysis**\\
\\
**Discover how YOLOv12 pushes the boundaries of document layout analysis.**](https://ppaanngggg.medium.com/yolov12-the-next-evolution-in-document-layout-analysis-7ffa6f8d6d5f?source=post_page---author_recirc--f08207280e67----2---------------------4bbbafb6_d5b3_4382_bb77_eb7e963143d3--------------)

Mar 19, 2025

![token counter main page](https://miro.medium.com/v2/resize:fit:679/format:webp/0*whL1lWp6QiIlfWfc.jpg)

[![ppaanngggg](https://miro.medium.com/v2/resize:fill:20:20/1*IfhciZFEiCaUWotDg3g5Qw.jpeg)](https://ppaanngggg.medium.com/?source=post_page---author_recirc--f08207280e67----3---------------------4bbbafb6_d5b3_4382_bb77_eb7e963143d3--------------)

[ppaanngggg](https://ppaanngggg.medium.com/?source=post_page---author_recirc--f08207280e67----3---------------------4bbbafb6_d5b3_4382_bb77_eb7e963143d3--------------)

[**How to count tokens in frontend for Popular LLM Models: GPT, Claude, and Llama**\\
\\
**A comprehensive guide to counting tokens in frontend for popular Language Learning Machine models using transformers.js.**](https://ppaanngggg.medium.com/how-to-count-tokens-in-frontend-for-popular-llm-models-gpt-claude-and-llama-5d6ef5a3fdd2?source=post_page---author_recirc--f08207280e67----3---------------------4bbbafb6_d5b3_4382_bb77_eb7e963143d3--------------)

May 21, 2024

[See all from ppaanngggg](https://ppaanngggg.medium.com/?source=post_page---author_recirc--f08207280e67---------------------------------------)

## Recommended from Medium

![Anthropic Just Released Claude Code Course (And I Earned My Certificate)](https://miro.medium.com/v2/resize:fit:679/format:webp/1*03JPjS5mc0CIGl80kS2nUQ.png)

[![AI Software Engineer](https://miro.medium.com/v2/resize:fill:20:20/1*RZVWENvZRwVijHDlg5hw7w.png)](https://medium.com/ai-software-engineer?source=post_page---read_next_recirc--f08207280e67----0---------------------df1602ed_adbb_4a86_b4eb_df85b11c4bcd--------------)

In

[AI Software Engineer](https://medium.com/ai-software-engineer?source=post_page---read_next_recirc--f08207280e67----0---------------------df1602ed_adbb_4a86_b4eb_df85b11c4bcd--------------)

by

[Joe Njenga](https://medium.com/@joe.njenga?source=post_page---read_next_recirc--f08207280e67----0---------------------df1602ed_adbb_4a86_b4eb_df85b11c4bcd--------------)

[**Anthropic Just Released Claude Code Course (And I Earned My Certificate)**\\
\\
**Anthropic just launched their Claude Code in Action course, and I’ve just passed — how about you?**](https://medium.com/@joe.njenga/anthropic-just-released-claude-code-course-and-i-earned-my-certificate-ad68745d46de?source=post_page---read_next_recirc--f08207280e67----0---------------------df1602ed_adbb_4a86_b4eb_df85b11c4bcd--------------)

Jan 21

[A clap icon3.5K\\
\\
A response icon50](https://medium.com/@joe.njenga/anthropic-just-released-claude-code-course-and-i-earned-my-certificate-ad68745d46de?source=post_page---read_next_recirc--f08207280e67----0---------------------df1602ed_adbb_4a86_b4eb_df85b11c4bcd--------------)

![Screenshot of a desktop with the Cursor application open](https://miro.medium.com/v2/resize:fit:679/format:webp/0*7x-LQAg1xBmi-L1p)

[![Jacob Bennett](https://miro.medium.com/v2/resize:fill:20:20/1*abnkL8PKTea5iO2Cm5H-Zg.png)](https://jacob.blog/?source=post_page---read_next_recirc--f08207280e67----1---------------------df1602ed_adbb_4a86_b4eb_df85b11c4bcd--------------)

[Jacob Bennett](https://jacob.blog/?source=post_page---read_next_recirc--f08207280e67----1---------------------df1602ed_adbb_4a86_b4eb_df85b11c4bcd--------------)

[**The 5 paid subscriptions I actually use in 2026 as a Staff Software Engineer**\\
\\
**Tools I use that are (usually) cheaper than Netflix**](https://jacob.blog/the-5-paid-subscriptions-i-actually-use-in-2026-as-a-staff-software-engineer-b4261c2e1012?source=post_page---read_next_recirc--f08207280e67----1---------------------df1602ed_adbb_4a86_b4eb_df85b11c4bcd--------------)

Jan 18

[A clap icon3.8K\\
\\
A response icon88](https://jacob.blog/the-5-paid-subscriptions-i-actually-use-in-2026-as-a-staff-software-engineer-b4261c2e1012?source=post_page---read_next_recirc--f08207280e67----1---------------------df1602ed_adbb_4a86_b4eb_df85b11c4bcd--------------)

![The 7 Boring B2B Micro SaaS Ideas With Zero Competition](https://miro.medium.com/v2/resize:fit:679/format:webp/1*m3zMc507s313EDf6vv_RdA.png)

[![NAJEEB](https://miro.medium.com/v2/resize:fill:20:20/1*1QKFssEZ93VxtQFIzeLq2Q.jpeg)](https://najeebweerabangsa.medium.com/?source=post_page---read_next_recirc--f08207280e67----2---------------------df1602ed_adbb_4a86_b4eb_df85b11c4bcd--------------)

[NAJEEB](https://najeebweerabangsa.medium.com/?source=post_page---read_next_recirc--f08207280e67----2---------------------df1602ed_adbb_4a86_b4eb_df85b11c4bcd--------------)

[**The 7 Boring B2B Micro SaaS Ideas With Zero Competition**\\
\\
**I spent the better part of last year building a complex real estate landing page builder using Supabase. I had also started piecing…**](https://najeebweerabangsa.medium.com/the-7-boring-b2b-micro-saas-ideas-with-zero-competition-c3fb73f6315b?source=post_page---read_next_recirc--f08207280e67----2---------------------df1602ed_adbb_4a86_b4eb_df85b11c4bcd--------------)

Mar 2

[A clap icon139\\
\\
A response icon4](https://najeebweerabangsa.medium.com/the-7-boring-b2b-micro-saas-ideas-with-zero-competition-c3fb73f6315b?source=post_page---read_next_recirc--f08207280e67----2---------------------df1602ed_adbb_4a86_b4eb_df85b11c4bcd--------------)

![11 Files App Tricks That Make Your iPhone Feel Like a Mac](https://miro.medium.com/v2/resize:fit:679/format:webp/1*zqcMukz5Vl0LgsV8uRXeqQ.png)

[![The Useful Tech](https://miro.medium.com/v2/resize:fill:20:20/1*GRF22WSeqIyv1lwoyQlCXQ.png)](https://medium.com/the-useful-tech?source=post_page---read_next_recirc--f08207280e67----3---------------------df1602ed_adbb_4a86_b4eb_df85b11c4bcd--------------)

In

[The Useful Tech](https://medium.com/the-useful-tech?source=post_page---read_next_recirc--f08207280e67----3---------------------df1602ed_adbb_4a86_b4eb_df85b11c4bcd--------------)

by

[The Useful Tech](https://theusefultech.com/?source=post_page---read_next_recirc--f08207280e67----3---------------------df1602ed_adbb_4a86_b4eb_df85b11c4bcd--------------)

[**11 Files App Tricks That Make Your iPhone Feel Like a Mac**\\
\\
**You Won’t Need Your Mac As Much Once You Know These Tricks**](https://theusefultech.com/11-files-app-tricks-that-make-your-iphone-feel-like-a-mac-20dec874a3fc?source=post_page---read_next_recirc--f08207280e67----3---------------------df1602ed_adbb_4a86_b4eb_df85b11c4bcd--------------)

Mar 2

[A clap icon248\\
\\
A response icon3](https://theusefultech.com/11-files-app-tricks-that-make-your-iphone-feel-like-a-mac-20dec874a3fc?source=post_page---read_next_recirc--f08207280e67----3---------------------df1602ed_adbb_4a86_b4eb_df85b11c4bcd--------------)

[See more recommendations](https://medium.com/?source=post_page---read_next_recirc--f08207280e67---------------------------------------)

[Help](https://help.medium.com/hc/en-us?source=post_page-----f08207280e67---------------------------------------)

[Status](https://status.medium.com/?source=post_page-----f08207280e67---------------------------------------)

[About](https://medium.com/about?autoplay=1&source=post_page-----f08207280e67---------------------------------------)

[Careers](https://medium.com/jobs-at-medium/work-at-medium-959d1a85284e?source=post_page-----f08207280e67---------------------------------------)

[Press](mailto:pressinquiries@medium.com)

[Blog](https://blog.medium.com/?source=post_page-----f08207280e67---------------------------------------)

[Privacy](https://policy.medium.com/medium-privacy-policy-f03bf92035c9?source=post_page-----f08207280e67---------------------------------------)

[Rules](https://policy.medium.com/medium-rules-30e5502c4eb4?source=post_page-----f08207280e67---------------------------------------)

[Terms](https://policy.medium.com/medium-terms-of-service-9db0094a1e0f?source=post_page-----f08207280e67---------------------------------------)

[Text to speech](https://speechify.com/medium?source=post_page-----f08207280e67---------------------------------------)

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)