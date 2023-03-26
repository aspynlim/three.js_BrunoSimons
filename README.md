# three.js_BrunoSimons

- How to generate a `SSH-key` & add it to GitHub
  * `ssh-keygen -t rsa -C` [e-mail address]
  * Copy it the info that shows up after entering `cat ~/.ssh/id_rsa.pub` ([Reference](https://www.techrepublic.com/article/how-to-view-your-ssh-keys-in-linux-macos-and-windows/))
    - The key should start with `ssh-rsa`
  * Add it to GitHub: Settings > SSH and GPG keys > SSH Keys
