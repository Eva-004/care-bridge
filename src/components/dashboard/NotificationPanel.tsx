
import { Card } from "@heroui/react";
import { FiBell, FiCheckCircle } from "react-icons/fi";

const NotificationPanel = () => {
    return (
        <Card className="h-full border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAF4F1] text-[#0F6848]">
                    <FiBell size={19} />
                </div>

                <div>
                    <h2 className="font-semibold text-[#1D2D44]">
                        Notifications
                    </h2>
                    <p className="text-xs text-gray-500">
                        Your latest updates
                    </p>
                </div>
            </div>

            <div className="flex min-h-[280px] flex-col items-center justify-center px-5 py-10 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EAF4F1] text-[#0F6848]">
                    <FiCheckCircle size={30} />
                </div>

                <h3 className="mt-4 font-semibold text-[#1D2D44]">
                    You`re all caught up!
                </h3>

                <p className="mt-2 max-w-xs text-sm leading-6 text-gray-500">
                    You don`t have any new notifications right now. We`ll let
                    you know when something important happens.
                </p>
            </div>

            <div className="border-t border-gray-100 bg-[#F8FAFB] px-5 py-3">
                <p className="text-center text-xs text-gray-500">
                    CareBridge keeps you updated.
                </p>
            </div>
        </Card>
    );
};

export default NotificationPanel;
