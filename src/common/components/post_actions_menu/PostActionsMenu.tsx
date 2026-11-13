import { useEffect, useRef } from "react";
import ReportPost from "../report_post/ReportPost";
import type { ReportPostType } from "@common/app/types/Report.types";
import * as S from "./PostActionsMenu.styles";
import { Ellipsis, Share, Warning } from "@/common/icons";

type PostActionsMenuProps = {
  postId: string;
  type: ReportPostType;
  onShare: () => void;
};

function PostActionsMenu({ postId, type, onShare }: PostActionsMenuProps) {
  const menuRef = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: PointerEvent) => {
      const menu = menuRef.current;
      if (menu && !menu.contains(event.target as Node)) {
        menu.open = false;
      }
    };
    document.addEventListener("pointerdown", handleClickOutside);
    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, []);
  const closeMenu = () => {
    if (menuRef.current) {
      menuRef.current.open = false;
    }
  };

  return (
    <S.MenuContainer ref={menuRef}>
      <S.MenuTrigger aria-label="Opciones de publicación">
        <Ellipsis aria-hidden="true" />
      </S.MenuTrigger>

      <S.MenuContent>
        <S.MenuOption
          type="button"
          onClick={() => {
            closeMenu();
            onShare();
          }}
        >
          <Share aria-hidden="true" />
          Compartir publicación
        </S.MenuOption>

        <ReportPost
          postId={postId}
          type={type}
          renderTrigger={(openReport, disabled, reported) => (
            <S.MenuOption
              type="button"
              disabled={disabled}
              onClick={() => {
                openReport();
                closeMenu();
              }}
            >
              <Warning aria-hidden="true" />
              {reported ? "Reporte enviado" : "Reportar publicación"}
            </S.MenuOption>
          )}
        />
      </S.MenuContent>
    </S.MenuContainer>
  );
}

export default PostActionsMenu;
