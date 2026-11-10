import { Hearts, LeafLeft, AvocadoIllustration } from "@/components/Decorations";

type Props = {
  title: string;
  subtitle?: string;
  bgClassName: string;       // np. "bg-avocado-pale"
  heartsClassName?: string;  // np. "text-avocado"
};

export default function PageHeader({ title, subtitle, bgClassName, heartsClassName = "" }: Props) {
  return (
    <div className={`relative overflow-hidden px-6 pb-16 pt-20 text-center ${bgClassName}`}>
      <LeafLeft className="left-[4%] top-0 hidden h-40 w-24 sm:block" />
      <LeafLeft className="right-[4%] top-0 hidden h-40 w-24 scale-x-[-1] sm:block" />
      <AvocadoIllustration className="bottom-0 right-[14%] hidden h-28 w-20 md:block" />

      <div className="relative z-10">
        <Hearts count={5} className={heartsClassName} />
        <h1 className="my-2 font-script text-[clamp(3rem,6vw,5rem)] text-peat">{title}</h1>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-[30rem] font-light text-bark">{subtitle}</p>
        )}
      </div>
    </div>
  );
}