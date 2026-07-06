import { useEffect, useState } from 'react';
import styles from './styles.module.css'
import { HistoryIcon, HouseIcon, MoonIcon, SettingsIcon, SunIcon } from 'lucide-react';

type AvailableThemes = 'dark' | 'light';

export function Menu(){
    const [theme, setTheme] = useState<AvailableThemes>(() => {
        const storageTheme = localStorage.getItem('theme') as AvailableThemes || 'dark';

        return storageTheme;
    });

    const nextThemeIcon = {
        dark: <SunIcon/>,
        light: <MoonIcon/>
    }

    function handleThemeChange(event: React.MouseEvent<HTMLAnchorElement,MouseEvent>,) {
        event.preventDefault();
        console.log('Clicado', Date.now());
        setTheme(prevTheme => {
            const nextTheme = prevTheme === 'dark' ? 'light' : 'dark';
            return nextTheme;
        });
        console.log(theme);
        document.documentElement.setAttribute('data-theme',theme);
    }

    useEffect(() => {
        document.documentElement.setAttribute('data-theme',theme);
        localStorage.setItem('theme',theme);
    },[theme]);

    return (
        <nav className={styles.menu}>
            <a className={styles.menuLink} href="#">
                <HouseIcon />
            </a>

            <a className={styles.menuLink} href="#">
                <HistoryIcon />
            </a>

            <a className={styles.menuLink} href="#">
                <SettingsIcon />
            </a>

            <a className={styles.menuLink} href="#" aria-label="Mudar tema" title='Mudar Tema' onClick={handleThemeChange}>
                {nextThemeIcon[theme]}
            </a>
        </nav>
    );
}