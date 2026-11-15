/* ============================================================
   GALLERY DATA
   One line per photo. To add a photo:
   1. Save a web version (about 1400px on the long edge) in /images/gallery/
   2. Optional: save a bigger version (about 2400px) in /images/gallery/full/
      with the SAME file name. It opens when someone clicks the photo.
   3. Add a line below (src, full, cat, caption).
   cat must be one of: speaking, leadership, team, events
   shape (optional) only affects placeholder tiles: tall, wide, sq
   If an image file is missing, a coloured placeholder tile shows instead.
   ============================================================ */
window.GALLERY = [
  { src: "images/gallery/speaking-01.jpg",   full: "images/gallery/full/speaking-01.jpg",   cat: "speaking",   caption: "Executive Speaker at the Lagos AI Career Experience, LACE 1.0", shape: "tall" },
  { src: "images/gallery/speaking-02.jpg",   full: "images/gallery/full/speaking-02.jpg",   cat: "speaking",   caption: "Facilitating at the Business Growth Workshop, University of Lagos", shape: "tall" },
  { src: "images/gallery/speaking-03.jpg",   full: "images/gallery/full/speaking-03.jpg",   cat: "speaking",   caption: "With the room after the Business Growth Workshop, University of Lagos", shape: "wide" },
  { src: "images/gallery/leadership-01.jpg", full: "images/gallery/full/leadership-01.jpg", cat: "leadership", caption: "Emerging Leaders Collective 2026, Small Business Grantee (Hammet Limited)", shape: "tall" },
  { src: "images/gallery/leadership-02.jpg", full: "images/gallery/full/leadership-02.jpg", cat: "leadership", caption: "Visionary Leadership Conference 2026", shape: "tall" },
  { src: "images/gallery/events-01.jpg",     full: "images/gallery/full/events-01.jpg",     cat: "events",     caption: "TPP Fest 2026, Strategic Execution Summit", shape: "wide" },
  { src: "images/gallery/events-02.jpg",     full: "images/gallery/full/events-02.jpg",     cat: "events",     caption: "Women in DeFi Summit 2025", shape: "sq" },
  { src: "images/gallery/events-03.jpg",     full: "images/gallery/full/events-03.jpg",     cat: "events",     caption: "With fellow leaders on event day", shape: "tall" },
  { src: "images/gallery/events-04.jpg",     full: "images/gallery/full/events-04.jpg",     cat: "events",     caption: "Community moments at an InfluxAI event", shape: "tall" },
  { src: "images/gallery/team-01.jpg",       full: "images/gallery/full/team-01.jpg",       cat: "team",       caption: "With the team", shape: "tall" }
];
window.GALLERY_CATS = [
  { id: "all", label: "All" },
  { id: "speaking", label: "Speaking" },
  { id: "leadership", label: "Leadership" },
  { id: "team", label: "Team" },
  { id: "events", label: "Events" }
];
