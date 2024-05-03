import React from 'react'

const Menu = () => {
    return (
        <Menu>
            <MenuButton>Open menu</MenuButton>
            <Portal>
                <MenuList>
                    <MenuItem>Menu 1</MenuItem>
                    <MenuItem>New Window</MenuItem>
                    <MenuItem>Open Closed Tab</MenuItem>
                    <MenuItem>Open File</MenuItem>
                </MenuList>
            </Portal>
        </Menu>
    )
}

export default Menu