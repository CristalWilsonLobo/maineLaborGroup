export default function GoogleFormEmbed({ src }: { src: string }) {
  return (
    <div className="rounded-2xl overflow-hidden border shadow-sm bg-white">
      <iframe
        src={src}
        className="w-full h-[900px]"
        title="Google Form"
      />
    </div>
  );
}
