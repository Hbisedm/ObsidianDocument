---
title: ohMyZsh配置的笔记
tags: ["ohMyZsh配置"]
创建时间: 星期五, 八月 5日 2022, 10:32:39 上午
修改时间: 星期五, 八月 5日 2022, 11:15:52 上午
---
#ohMyZsh

# ohMyZsh配置的笔记

> 作为一个程序员，可以没钱，没车，没房，没老婆，没女朋友。
> 但是，一定要有一个漂亮骚气的终端。


## 安装

1. 安装iterm2 或者用系统自带的终端

切换到zsh，不过现在默认就是zsh

2. 使用git clone oh-my-zsh项目

[将里面的配置](https://github.com/ohmyzsh/ohmyzsh/blob/master/templates/zshrc.zsh-template)复制到`~/.zshrc`

3. 安装p10k

```
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
```

4. 配置zsh `~/.zshrc`
```
ZSH_THEME="powerlevel10k/powerlevel10k"
```

5. 配置字体

推荐安装 Nerd Font 字体

> google搜索nerd fonts github 下载安装 Hack Nerd Font。

下载好后，配置iterm2或者系统终端的字体

6. 配置p10k进行样式配置

```shell
# 使用p10k进行整体配置
$ p10k configure 

# 使用vscode打开 修改细节
$ code ~/.p10k.zsh 

# 颜色选择
$ for i in {0..255}; do print -Pn "%K{$i}  %k%F{$i}${(l:3::0:)i}%f " ${${(M)$((i%6)):#3}:+$'\n'}; done

# 符号
$ echo 'f060='"\uf060" 'f061='"\uf061" 'f062='"\uf062" 'f063='"\uf063" 'f0b2='"\uf0b2" 'f06a='"\uf06a" 'f071='"\uf071" 'f05a='"\uf05a"
```

`p10k.zsh` 里面的一些细节配置
```ini
# 左侧显示部分 
POWERLEVEL9K_LEFT_PROMPT_ELEMENTS 

# 右侧显示部分 
POWERLEVEL9K_RIGHT_PROMPT_ELEMENTS

# 指令输入时左边的符号 `$` 修改
typeset -g POWERLEVEL9K_PROMPT_CHAR_{OK,ERROR}_VIINS_CONTENT_EXPANSION 

#版本控制
## before
    typeset -g POWERLEVEL9K_VCS_UNTRACKED_ICON='?'
.....
    (( VCS_STATUS_NUM_CONFLICTED )) && res+=" ${conflicted}~${VCS_STATUS_NUM_CONFLICTED}"
    (( VCS_STATUS_NUM_STAGED     )) && res+=" ${modified}+${VCS_STATUS_NUM_STAGED}"
    (( VCS_STATUS_NUM_UNSTAGED   )) && res+=" ${modified}!${VCS_STATUS_NUM_UNSTAGED}"

## after
    typeset -g POWERLEVEL9K_VCS_UNTRACKED_ICON='\uF059'
.....
    (( VCS_STATUS_NUM_CONFLICTED )) && res+=" ${conflicted}"$'\uF28D'"${VCS_STATUS_NUM_CONFLICTED}"
    (( VCS_STATUS_NUM_STAGED     )) && res+=" ${modified}"$'\uF055'"${VCS_STATUS_NUM_STAGED}"
    (( VCS_STATUS_NUM_UNSTAGED   )) && res+=" ${modified}"$'\uF06A'"${VCS_STATUS_NUM_UNSTAGED}"
```





[参考链接1](https://blog.51cto.com/u_14415843/2494693)
[配置p10k](https://www.onejar99.com/zsh-powerlevel10k-custom-config-note/)