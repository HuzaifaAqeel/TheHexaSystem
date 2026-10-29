<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Public website UI lives in src/site with shared redesign.css, reusable display components, and typed route wrappers; preserve the existing admin independently. Why: keeps the premium multi-page design coherent without changing the admin or browser-local persistence.
- Public service details use services_.$slug.tsx, unnested from the services overview. Why: each detail page must mount independently of the overview body.
- Marketing facts are curated in src/site/content.ts, while illustrative calculator arithmetic is isolated and tested. Why: unverified demo client/team records must not become public evidence and assumptions must be transparent.
- Forms prepare explicit email drafts until an authorized receiving service or scheduler is configured. Why: no backend existed in the imported site, so the interface must never simulate successful delivery or booking.
- Shared growth CTAs default to Contact, and BookingSection supports embedded and standalone presentations. Why: keeps the combined inquiry/calendar experience consistent without duplicating booking state.
- Explicitly prebundle Radix Select in Vite alongside the template's React dependencies. Why: late dependency discovery can leave a preview session using different React module instances and crash hooks.
