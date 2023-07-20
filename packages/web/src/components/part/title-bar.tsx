export default function TitleBar() {
  return (
    <h1
      className="py-2 text-center text-sm"
      style={{
        // @ts-expect-error -webkit-app-region is not in the CSS spec
        WebkitAppRegion: "drag",
      }}
    >
      Restarter
    </h1>
  )
}
