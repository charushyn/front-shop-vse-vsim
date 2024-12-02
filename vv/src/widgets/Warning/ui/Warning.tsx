import { P } from "@/shared/ui/index";
import { TypographyP } from "@/shared/uiShadcn/typography";

export default function Warning() {
  return (
    <div className="w-full p-4 flex flex-row gap-2 justify-between bg-[#F0F0F0] t-s:px-8 items-center d-s:gap-10">
      <div className="w-[10%] h-full d-s:w-fit">
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full t-s:h-10 t-s:w-10"
        >
          <path d="M20 2H4c-1.103 0-2 .897-2 2v18l4-4h14c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm-7 13h-2v-2h2v2zm0-4h-2V5h2v6z" />
        </svg>
      </div>
      <TypographyP className=" tracking-wider w-[90%] d-s:w-full">
        Комплектація замовлень 2-3 робочих дні. Мінімальна сума замовлення 500
        грн.
      </TypographyP>
    </div>
  );
}
