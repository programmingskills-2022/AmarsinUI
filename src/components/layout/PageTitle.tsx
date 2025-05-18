import { useEffect } from "react";
import { useAuthStore } from "../../store/authStore";
import { useBrandStore } from "../../store/brandStore";
import { convertToFarsiDigits } from "../../utilities/general";
import { useBrand } from "../../hooks/useBrands";

const PageTitle = () => {
  const { authApiResponse } = useAuthStore();
  const initData = authApiResponse?.data.result.initData;
  const { brands } = useBrandStore();
  const { getBrands } = useBrand();

  useEffect(() => {
    getBrands();
  }, []);

  console.log(brands)
  return (
    <div className="flex text-xs sm:text-sm px-2">
      <div className="flex flex-col justify-end items-end">
        <div>سیستم:</div>
        <div className="whitespace-nowrap">سال مالی:</div>
      </div>
      <div className="flex flex-col items-start justify-center font-semibold px-2">
        <div>
          {initData?.systemTitle}
        </div>
        <div>{convertToFarsiDigits(initData?.yearTitle)}</div>
      </div>
    </div>
  );
};
export default PageTitle;
