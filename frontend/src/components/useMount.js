/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

const useMount = (effect) => useEffect(effect, []);

export default useMount;