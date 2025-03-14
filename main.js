import anime from 'anime'; 

// Stats animation observer
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      anime({
        targets: entry.target,
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 800,
        easing: 'easeOutExpo'
      });
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => {
  statsObserver.observe(card);
});

// Enhanced button hover
const actionButton = document.getElementById('actionButton');
if (actionButton) {
  actionButton.addEventListener('mousemove', (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    anime({
      targets: '.btn-shine',
      background: `linear-gradient(45deg,
        transparent,
        rgba(255,255,255,${x * 0.3}),
        transparent)`,
      duration: 300,
      easing: 'easeOutQuad'
    });
  });
}

// Add smooth scroll to features
if (actionButton) {
  actionButton.addEventListener('click', () => {
    document.querySelector('#features').scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  });
}

// Update category animation logic
function showCategory(categoryId) {
  const categories = document.querySelectorAll('.feature-category');
  const mainCategory = document.querySelector('[data-category="main"]');
  
  anime({
    targets: '.feature-category.active',
    opacity: 0,
    translateY: 20,
    duration: 300,
    easing: 'easeInExpo',
    complete: () => {
      categories.forEach(c => c.style.display = 'none');
      const target = categoryId ? 
        document.querySelector(`[data-category="${categoryId}"]`) : mainCategory;
      if (target) {
        target.style.display = 'block';
        anime({
          targets: target,
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 400,
          easing: 'easeOutExpo'
        });
      }
    }
  });
}

// Updated category mapping without player-list/song-player
document.querySelectorAll('.feature-category li').forEach(li => {
  li.addEventListener('click', (e) => {
    const categoryMap = {
      'Rig Mods': 'rig',
      'PC Mods': 'pc',
      'Other Player Mods': 'other-player',
      'Spoof Mods': 'spoof',
      'Movement Mods': 'movement',
      'Settings': 'settings'
    };
    
    const categoryId = categoryMap[e.target.textContent.trim()];
    if (categoryId) showCategory(categoryId);
  });
});

// Updated return button handler to use showCategory
document.querySelectorAll('.return-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    showCategory(null);
  });
});

// Initialize main category
document.addEventListener('DOMContentLoaded', () => {
  showCategory(null);
});

// Add Discord handle copy functionality
document.querySelectorAll('.copyable-handle').forEach(handle => {
  handle.addEventListener('click', (e) => {
    navigator.clipboard.writeText('industry_');
    const originalText = e.target.textContent;
    e.target.textContent = 'Copied!';
    setTimeout(() => e.target.textContent = originalText, 1000);
  });
});