"use client";

import { H1, H2, P } from "@/shared/ui";

import { useRouter } from "next/navigation";

export default function PrivacyPolicyPage() {
  const router = useRouter();
  return (
    <div className="px-4 flex flex-col gap-4">
      <div
        className="flex flex-row gap-2 items-center mt-4 mb-2 cursor-pointer"
        onClick={() => {
          router.push("/");
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
          />
        </svg>
        <H2>Назад</H2>
      </div>
      <H1 className="font-bold">Договір ПО</H1>
      <div className="flex flex-col gap-1">
        <H2 className=" font-bold">Договір публічної оферти</H2>
        <P className=" font-bold">Загальні положення</P>
        <P>
          1.1. Справжня оферта, є офіційною пропозицією ТМ «Vsevsim.com.ua»,
          далі за текстом - «Продавець», укласти Договір купівлі-продажу товарів
          дистанційним способом, тобто через Інтернет-магазин, далі по тексту -
          «Договір», і розміщує Публічну оферту (пропозицію) на офіційному
          інтернет-сайті Продавця «https://vsevsim.com.ua (далі -« Інтернет-сайт
          »).
        </P>
        <P>
          1.2. Моментом повного і безумовного прийняття Покупцем пропозиції
          Продавця (акцептом) укласти електронний договір купівлі-продажу
          товарів, вважається факт оплати Покупцем замовлення на умовах цього
          Договору, у строки та за цінами, вказаними на Інтернет-сайті Продавця.
        </P>
      </div>
      <div className="flex flex-col gap-1">
        <H2 className=" font-bold">Поняття і визначення</H2>
        <P>
          2.1. У цій оферті, якщо контекст не вимагає іншого, наведені нижче
          терміни мають таке значення:
        </P>
        <P>
          * «Товар» - моделі, аксесуари, комплектуючі та супровідні предмети;
        </P>
        <P>
          * «Інтернет-магазин» - відповідно до Закону України «про електронну
          комерцію», засіб для подання або реалізації товару, роботи або послуги
          шляхом здійснення електронної угоди.
        </P>
        <P>
          * «Продавець» - компанія, яка реалізує товари, представлені на
          Інтернет-сайті.
        </P>
        <P>
          * «Покупець» - фізична особа, що уклала з Продавцем Договір на умовах,
          викладених нижче.
        </P>
        <P>
          * «Замовлення» - вибір окремих позицій з переліку товарів, зазначених
          Покупцем при розміщенні замовлення і проведенні оплати.
        </P>
      </div>
      <div className="flex flex-col gap-1">
        <H2 className=" font-bold">Предмет договору</H2>
        <P>
          3.1. Продавець зобов'язується передати у власність Покупця Товар, а
          Покупець зобов'язується оплатити і прийняти Товар на умовах даного
          Договору.
        </P>
        <P>
          Цей Договір регулює купівлю-продаж товарів в Інтернет-магазині, в тому
          числі:
        </P>
        <P>- добровільний вибір Покупцем товарів в Інтернет-магазині;</P>
        <P>- самостійне оформлення Покупцем замовлення в Інтернет-магазині;</P>
        <P>- оплата Покупцем замовлення, оформленого в Інтернет-магазині;</P>
        <P>
          - обробка і доставка замовлення Покупцеві у власність на умовах цього
          Договору.
        </P>
      </div>

      <div className="flex flex-col gap-1">
        <H2 className=" font-bold">Порядок оформлення замовлення</H2>
        <P>
          4.1. Покупець має право оформити замовлення на будь-який товар,
          представлений на Сайті Інтернет-магазину і наявний.
        </P>

        <P>
          4.2. Кожна позиція може бути представлена ​​в замовленні в будь-якій
          кількості.
        </P>

        <P>
          4.3. При відсутності товару на складі, Менеджер компанії зобов'язаний
          поставити Покупця до відома (по телефону або через електронну пошту).
        </P>

        <P>
          4.4. При відсутності товару Покупець має право замінити його товаром
          аналогічної моделі, відмовитися від даного товару, анулювати
          замовлення.
        </P>
      </div>

      <div className="flex flex-col gap-1">
        <H2 className=" font-bold">Порядок оплати замовлення</H2>
        <P className="font-bold">Післясплата</P>
        <P>
          5.1. Оплата здійснюється за фактом отримання товару у відділенні
          транспортних компанії за готівковий розрахунок в гривнях.
        </P>
        <P>
          5.2. Прі не надходження коштів Інтернет-магазин залишає за собою право
          анулювати замовлення.
        </P>
      </div>

      <div className="flex flex-col gap-1">
        <H2 className=" font-bold">Умови доставки замовлення</H2>
        <P>
          6.1. Доставка товарів, придбаних в Інтернет-магазині, здійснюється до
          складів транспортних компаній, де і здійснюється видача замовлень.
        </P>
        <P>
          6.2. Разом із замовленням Покупцеві надаються документи згідно
          законодавства України.
        </P>
      </div>
      <div className="flex flex-col gap-1">
        <H2 className=" font-bold">Права та обов'язки сторін:</H2>
        <P>7.1. Продавець має право:</P>
        <P>
          - в односторонньому порядку припинити надання послуг за цим договором
          у разі порушення Покупцем умов цього договору.
        </P>
        <P>7.2. Покупець зобов'язаний:</P>
        <P>
          - своєчасно оплатити та отримати замовлення на умовах цього договору.
        </P>
        <P>7.3. Покупець має право:</P>
        <P>- оформити замовлення в Інтернет-магазині;</P>
        <P>- оформити електронний договір;</P>
        <P>- вимагати від Продавця виконання умов цього Договору.</P>
      </div>
      <div className="flex flex-col gap-1">
        <H2 className=" font-bold">Відповідальність сторін</H2>
        <P>
          8.1. Сторони несуть відповідальність за невиконання або неналежне
          виконання умов цього договору в порядку, передбаченому цим договором
          та чинним законодавством України.
        </P>
        <P>8.2. Продавець не несе відповідальності за:</P>
        <P>- змінений виробником зовнішній вигляд Товару;</P>
        <P>
          - за незначну невідповідність колірної гами товару, що може
          відрізнятися від оригіналу товару виключно через різний колір передачі
          моніторів персональних комп'ютерів окремих моделей;
        </P>
        <P>
          - за зміст і правдивість інформації, наданої Покупцем при оформленні
          замовлення;
        </P>
        <P>
          - за затримку і перебої в наданні Послуг (обробки замовлення та
          доставки товару), які відбуваються з причин, що знаходяться поза
          сферою його контролю;
        </P>
        <P>
          - за протиправні незаконні дії, здійснені Покупцем за допомогою даного
          доступу до мережі Інтернет;
        </P>
        <P>
          - за передачу Покупцем своїх мережевих ідентифікаторів - IP,
          MAC-адреси, логіна і пароля третім особам;
        </P>
        <P>
          8.3. Покупець, використовуючи наданий йому доступ до мережі Інтернет,
          самостійно несе відповідальність за шкоду, заподіяну його діями
          (особисто, навіть якщо під його логіном знаходилося іншу особу) особам
          або їх майну, юридичним особам, державі чи моральним принципам
          моральності.
        </P>
        <P>
          8.4. У разі настання обставин непереборної сили, сторони звільняються
          від виконання умов цього договору. Під обставинами непереборної сили
          для цілей цього договору розуміються події, що мають надзвичайний,
          непередбачений характер, які виключають або об'єктивно заважають
          виконанню цього договору, настання яких Сторони не могли передбачити і
          запобігти розумними засобами.
        </P>
        <P>
          8.5. Сторони прикладають максимум зусиль для вирішення будь-яких
          розбіжностей виключно шляхом переговорів.
        </P>
      </div>

      <div className="flex flex-col gap-1">
        <H2 className="font-bold">Інші умови</H2>
        <P>
          9.1. Інтернет-магазин залишає за собою право в односторонньому порядку
          вносити зміни до цього договору за умови попередньої публікації його
          на сайті https://vsevsim.com.ua
        </P>
        <P>
          9.2. Інтернет-магазин створений для організації дистанційного способу
          продажу товарів через Інтернет.
        </P>
        <P>
          9.3. Покупець несе відповідальність за достовірність інформації,
          зазначеної при оформленні замовлення інформації. При цьому, при
          здійсненні акцепту (оформленні замовлення і подальшої оплати товару)
          Покупець надає Продавцю свою беззастережну згоду на збір, обробку,
          зберігання, використання своїх персональних даних, в розумінні ЗУ «Про
          захист персональних даних».
        </P>
        <P>
          9.4. Оплата Покупцем оформленого в Інтернет-магазині замовлення
          означає повну згоду Покупця з умовами договору купівлі-продажу
          (публічної оферти).
        </P>
        <P>
          9.5. Фактичною датою електронного угоди між сторонами є дата прийняття
          умов, відповідно до ст. 11 Закону України «Про електронну комерцію».
        </P>
        <P>
          9.6. Використання ресурсу Інтернет-магазину для попереднього перегляду
          товару, а також для оформлення замовлення для Покупця є безкоштовним.
        </P>
        <P>
          9.7. Інформація, яку надає Покупцем є конфіденційною. Інтернет-магазин
          використовує інформацію про Покупця виключно в цілях обробки
          замовлення, відправлення повідомлень Покупцеві, доставки товару,
          здійснення взаєморозрахунків тощо.
        </P>
      </div>
      <div className="flex flex-col gap-1">
        <H2 className="font-bold">Порядок повернення товару належної якості</H2>
        <P>
          10.1. Повернення товару в Інтернет-магазин проводиться згідно чинного
          законодавства України.
        </P>
        <P>
          10.2. Повернення товару в Інтернет-магазин проводиться за рахунок
          Покупця.
        </P>
        <P>
          10.3. При поверненні Покупцем товару належної якості, Інтернет-магазин
          повертає йому сплачену за товар грошову суму за фактом повернення
          товару за вирахуванням компенсації витрат Інтернет-магазину пов'язаних
          з доставкою товару Покупцеві.
        </P>
      </div>
      <div className="flex flex-col gap-1">
        <H2 className="font-bold">Термін дії договору</H2>
        <P>
          11.1. Електронний договір вважається укладеним з моменту одержання
          особою яка направила пропозицію укласти такий договір, відповіді про
          прийняття цієї пропозиції в порядку, визначеному частиною шостою
          статті 11 Закону України "Про електронну комерцію".
        </P>
        <P>
          11.2. До закінчення терміну дії цей Договір може бути розірваний за
          взаємною згодою сторін до моменту фактичної доставки товару, шляхом
          повернення грошових коштів.
        </P>
      </div>
    </div>
  );
}
