import Image from "next/image";
import Link from "next/link";
import type { Homepage } from "@/lib/api";
import { Hearts, GreenBlob, LeafLeft, AvocadoIllustration } from "@/components/Decorations";

export default function Hero({ profile }: { profile: Homepage["profile"] }) {
  return (
    <section className="relative grid items-center overflow-hidden md:min-h-[92vh] md:grid-cols-2">
      <GreenBlob className="-right-40 -top-60 h-[50rem] w-[50rem]" />
      <GreenBlob className="-bottom-20 -left-20 h-[25rem] w-[25rem]" />
      <LeafLeft className="left-8 top-12 h-[200px] w-[120px]" />
      <AvocadoIllustration className="bottom-16 left-[5%] h-[150px] w-[120px]" />

      <div className="relative z-10 px-6 pb-8 pt-16 md:py-24 md:pl-[max(2rem,calc(50vw-36rem))] md:pr-12">
        <Hearts count={3} />
        <h1 className="my-4 font-script text-[clamp(3rem,6vw,5rem)] leading-[1.1] text-peat">
          Zdrowe życie<br />zaczyna się<br />od talerza
        </h1>
        {profile && (
          <p className="my-6 max-w-[26rem] font-light leading-[1.8] text-bark">
            Jestem <strong className="font-semibold">{profile.name}</strong>
            {profile.bio ? ` — ${profile.bio.split(".")[0]}.` : ""}
          </p>
        )}
        <div className="flex flex-wrap gap-3">
          <Link href="/kontakt" className="rounded-full bg-avocado px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90">
            Zarezerwuj konsultację
          </Link>
          <Link href="/przepisy" className="rounded-full border-2 border-avocado px-7 py-3 text-sm font-semibold text-avocado transition-colors hover:bg-avocado-pale">
            Zobacz przepisy
          </Link>
        </div>
      </div>

        <div className="relative z-10 flex justify-center px-6 pb-16 pt-4 md:py-12">
        <div className="relative w-full max-w-[22rem]">
            <div className="relative aspect-[11/14] w-full overflow-hidden rounded-t-[12rem] rounded-b-[10rem] border-4 border-white bg-sage-light shadow-[0_8px_40px_rgba(0,0,0,0.1)]">
            {profile?.photo ? (
                <Image src={profile.photo} alt={profile.name} fill sizes="352px" className="object-cover" priority unoptimized />
            ) : (
                <div className="flex h-full items-center justify-center text-7xl">🥑</div>
            )}
            </div>
            {profile?.tagline && (
            <div className="absolute bottom-4 right-2 rounded-3xl border-[1.5px] border-dashed border-blush-deep bg-blush-light px-5 py-4 shadow-lg md:-right-8 md:bottom-8 md:px-6 md:py-5">
                <p className="font-script text-xl text-bark">{profile.tagline}</p>
                <p className="mt-1 text-center text-2xl">🥑</p>
            </div>
            )}
        </div>
        </div>
    </section>
  );
}