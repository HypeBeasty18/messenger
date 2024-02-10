import { TUserSelect } from 'types/types';
import { useActions } from './useActions';

export const useChatClick = () => {
    const actions = useActions();

    const handleSelect = (userinfo: TUserSelect) => {
        const { uid, photoURL, displayName } = userinfo;

        actions.saveCurrentChat({ uid, photoURL, displayName });
    };

    return handleSelect;
};
